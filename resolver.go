package googlekeepclone

//go:generate go run github.com/99designs/gqlgen

import (
	"context"
	"errors"

	"github.com/jinzhu/gorm"
	gonanoid "github.com/matoous/go-nanoid"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

const (
	MsgNotAuthenticated string = "NotAuthenticated"
	CtxUserIDKey        string = "userid"
	IDSize              int    = 4
)

type Resolver struct {
	DB *gorm.DB
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTodo(ctx context.Context, title string, notes []string, labels []*string, color *string, isCheckboxMode *bool) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		newTodoID, _ := gonanoid.Nanoid(IDSize)
		todo := Todo{
			ID:             newTodoID,
			Title:          title,
			Color:          *color,
			IsCheckboxMode: *isCheckboxMode,
			UserID:         userID,
			Notes:          make([]*Note, len(notes)),
		}
		for index, note := range notes {
			newNoteID, _ := gonanoid.Nanoid(IDSize)
			todo.Notes[index] = &Note{
				ID:          newNoteID,
				Text:        note,
				IsCompleted: false,
			}
		}
		err := r.DB.Where("id in (?)", labels).Find(&todo.Labels).Error // Load the related labels
		if err != nil {
			return nil, err
		}
		err = r.DB.Create(&todo).Error
		if err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) UpdateTodo(ctx context.Context, id string, title *string, notes []*NotesInput, labels []*string, color *string, isCheckboxMode *bool) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		todo := Todo{
			ID:     id,
			Labels: []*Label{},
			Notes:  []*Note{},
		}
		err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").Find(&todo).Error
		if err != nil {
			return nil, err
		}

		if title != nil {
			todo.Title = *title
		}
		if color != nil {
			todo.Color = *color
		}
		if isCheckboxMode != nil {
			todo.IsCheckboxMode = *isCheckboxMode
		}
		err = r.DB.Save(&todo).Error
		if err != nil {
			return nil, err
		}

		if labels != nil {
			lbls := []Label{}
			r.DB.Where("id in (?)", labels).Find(&lbls)
			r.DB.Model(&todo).Association("Labels").Replace(lbls)
		}

		if notes != nil {
			nts := make([]Note, len(notes))
			for index, note := range notes {
				newNoteID, _ := gonanoid.Nanoid(IDSize)
				nts[index] = Note{
					ID:          newNoteID,
					Text:        note.Text,
					IsCompleted: note.IsCompleted,
				}
			}
			r.DB.Model(&todo).Association("Notes").Replace(nts)
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, id string) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		todo := Todo{
			ID:    id,
			Notes: []*Note{},
		}
		err := r.DB.Where("user_id = ?", userID).Preload("Notes").Find(&todo).Error // Only load associated notes
		if err != nil {
			return nil, err
		}
		r.DB.Model(&todo).Association("Labels").Clear()
		err = r.DB.Delete(todo).Error
		if err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) CopyTodo(ctx context.Context, sourceID string) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		todo := Todo{
			ID:     sourceID,
			Labels: []*Label{},
			Notes:  []*Note{},
		}
		err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").First(&todo).Error
		if err != nil {
			return nil, err
		}
		todo.ID, _ = gonanoid.Nanoid(IDSize)
		for _, note := range todo.Notes {
			note.ID, _ = gonanoid.Nanoid(IDSize)
		}
		err = r.DB.Create(&todo).Error
		if err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) CreateLabel(ctx context.Context, name string) (*Label, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		newLabelID, _ := gonanoid.Nanoid(IDSize)
		label := Label{
			ID:     newLabelID,
			Name:   name,
			UserID: userID,
		}
		err := r.DB.Create(&label).Error
		if err != nil {
			return nil, err
		}
		return &label, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) DeleteLabel(ctx context.Context, id string) (*Label, error) {
	panic("not implemented")
}
func (r *mutationResolver) UpdateUser(ctx context.Context, listMode *bool, darkMode *bool) (*User, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		user := User{
			ID:       userID,
			ListMode: *listMode,
			DarkMode: *darkMode,
		}
		err := r.DB.Save(&user).Error
		if err != nil {
			return nil, err
		}
		return &user, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context) ([]*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		todos := []*Todo{}
		err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").Find(&todos).Error
		if err != nil {
			return nil, err
		}
		return todos, nil
	}
	return nil, errors.New(MsgNotAuthenticated)

}
func (r *queryResolver) Labels(ctx context.Context) ([]*Label, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		labels := []*Label{}
		err := r.DB.Where("user_id = ?", userID).Preload("Todos").Find(&labels).Error
		if err != nil {
			return nil, err
		}
		return labels, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *queryResolver) User(ctx context.Context) (*User, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		user := User{}
		err := r.DB.First(&user, userID).Error
		if err != nil {
			return nil, err
		}
		return &user, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}

type subscriptionResolver struct{ *Resolver }

func (r *subscriptionResolver) TodoStream(ctx context.Context) (<-chan *TodoAction, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		todoAction := make(chan *TodoAction, 1)
		callbackCreateID, _ := gonanoid.Nanoid(6)
		callbackUpdateID, _ := gonanoid.Nanoid(6)
		callbackDeleteID, _ := gonanoid.Nanoid(6)
		r.DB.Callback().Create().Register(callbackCreateID, func(scope *gorm.Scope) {
			createdTodo, ok := scope.Value.(*Todo)
			if ok && createdTodo.UserID == userID {
				todoAction <- &TodoAction{
					Action: ActionCreated,
					Todo:   createdTodo,
				}
			}
		})
		r.DB.Callback().Update().Register(callbackUpdateID, func(scope *gorm.Scope) {
			updatedTodo, ok := scope.Value.(*Todo)
			if ok && updatedTodo.UserID == userID {
				todoAction <- &TodoAction{
					Action: ActionUpdated,
					Todo:   updatedTodo,
				}
			}
		})
		r.DB.Callback().Delete().Register(callbackDeleteID, func(scope *gorm.Scope) {
			deletedTodo, ok := scope.Value.(*Todo)
			if ok && deletedTodo.UserID == userID {
				todoAction <- &TodoAction{
					Action: ActionDeleted,
					Todo:   deletedTodo,
				}
			}
		})
		go func() {
			<-ctx.Done()
			r.DB.Callback().Create().Remove(callbackCreateID)
			r.DB.Callback().Update().Remove(callbackUpdateID)
			r.DB.Callback().Delete().Remove(callbackDeleteID)
		}()
		return todoAction, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *subscriptionResolver) LabelStream(ctx context.Context) (<-chan *LabelAction, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != nil {
		userID := userID.(string)
		labelAction := make(chan *LabelAction, 1)
		callbackCreateID, _ := gonanoid.Nanoid(6)
		callbackUpdateID, _ := gonanoid.Nanoid(6)
		callbackDeleteID, _ := gonanoid.Nanoid(6)
		r.DB.Callback().Create().Register(callbackCreateID, func(scope *gorm.Scope) {
			createdLabel, ok := scope.Value.(*Label)
			if ok && createdLabel.UserID == userID {
				labelAction <- &LabelAction{
					Action: ActionCreated,
					Label:  createdLabel,
				}
			}
		})
		r.DB.Callback().Update().Register(callbackUpdateID, func(scope *gorm.Scope) {
			updatedLabel, ok := scope.Value.(*Label)
			if ok && updatedLabel.UserID == userID {
				labelAction <- &LabelAction{
					Action: ActionUpdated,
					Label:  updatedLabel,
				}
			}
		})
		r.DB.Callback().Delete().Register(callbackDeleteID, func(scope *gorm.Scope) {
			deletedLabel, ok := scope.Value.(*Label)
			if ok && deletedLabel.UserID == userID {
				labelAction <- &LabelAction{
					Action: ActionDeleted,
					Label:  deletedLabel,
				}
			}
		})
		go func() {
			<-ctx.Done()
			r.DB.Callback().Create().Remove(callbackCreateID)
			r.DB.Callback().Update().Remove(callbackUpdateID)
			r.DB.Callback().Delete().Remove(callbackDeleteID)
		}()
		return labelAction, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
