package server

//go:generate go run github.com/99designs/gqlgen

import (
	"context"
	"errors"

	"github.com/jinzhu/gorm"
	gonanoid "github.com/matoous/go-nanoid"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

const (
	// MsgNotAuthenticated is the constant for Not Authenticated message
	MsgNotAuthenticated string = "NotAuthenticated"
	// CtxUserIDKey holds the key for 'userid' value
	CtxUserIDKey string = "userid"
	// IDSize is the size of the UIDs generated for DB columns
	IDSize int = 4
)

// Resolver holds the Query, mutation and subscription resolvers
type Resolver struct {
	DB *gorm.DB
}

// Mutation returns an instance of mutationResolver
func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

// Query returns an instance of queryResolver
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

// Subscription returns an instance of subscriptionResolver
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTodo(ctx context.Context, title string, notes []string, labels []*string, color *string, isCheckboxMode *bool) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
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
		if err := r.DB.Where("id in (?)", labels).Find(&todo.Labels).Error; err != nil { // Load the related labels
			return nil, err
		}
		if err := r.DB.Create(&todo).Error; err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) UpdateTodo(ctx context.Context, id string, title *string, notes []*NotesInput, labels []*string, color *string, isCheckboxMode *bool) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		todo := Todo{
			ID:     id,
			UserID: userID,
			Labels: []*Label{},
			Notes:  []*Note{},
		}
		if err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").Find(&todo).Error; err != nil {
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
		if err := r.DB.Save(&todo).Error; err != nil {
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
			// Updating Association just updates the references, won't clear the data. So, manually deleting the notes
			r.DB.Delete(todo.Notes)
			r.DB.Model(&todo).Association("Notes").Replace(nts)
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, id string) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		todo := Todo{
			ID:     id,
			UserID: userID,
			Notes:  []*Note{},
		}
		if err := r.DB.Where("user_id = ?", userID).Preload("Notes").Find(&todo).Error; err != nil { // Only load associated notes
			return nil, err
		}
		if err := r.DB.Model(&todo).Association("Labels").Clear().Error; err != nil {
			return nil, err
		}
		if err := r.DB.Delete(todo).Error; err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) CopyTodo(ctx context.Context, sourceID string) (*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		todo := Todo{
			ID:     sourceID,
			UserID: userID,
			Labels: []*Label{},
			Notes:  []*Note{},
		}
		if err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").First(&todo).Error; err != nil {
			return nil, err
		}
		todo.ID, _ = gonanoid.Nanoid(IDSize)
		for _, note := range todo.Notes {
			note.ID, _ = gonanoid.Nanoid(IDSize)
		}
		if err := r.DB.Create(&todo).Error; err != nil {
			return nil, err
		}
		return &todo, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *mutationResolver) CreateLabel(ctx context.Context, name string) (*Label, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		newLabelID, _ := gonanoid.Nanoid(IDSize)
		label := Label{
			ID:     newLabelID,
			Name:   name,
			UserID: userID,
		}
		if err := r.DB.Create(&label).Error; err != nil {
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
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		user := User{
			ID:       userID,
			ListMode: *listMode,
			DarkMode: *darkMode,
		}
		if err := r.DB.Save(&user).Error; err != nil {
			return nil, err
		}
		return &user, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context) ([]*Todo, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		todos := []*Todo{}
		if err := r.DB.Where("user_id = ?", userID).Preload("Notes").Preload("Labels").Find(&todos).Error; err != nil {
			return nil, err
		}
		return todos, nil
	}
	return nil, errors.New(MsgNotAuthenticated)

}
func (r *queryResolver) Labels(ctx context.Context) ([]*Label, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		labels := []*Label{}
		if err := r.DB.Where("user_id = ?", userID).Preload("Todos").Find(&labels).Error; err != nil {
			return nil, err
		}
		return labels, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
func (r *queryResolver) User(ctx context.Context) (*User, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		user := User{
			ID: userID,
		}
		if err := r.DB.First(&user).Error; err != nil {
			return nil, err
		}
		return &user, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}

type subscriptionResolver struct{ *Resolver }

func (r *subscriptionResolver) TodoStream(ctx context.Context) (<-chan *TodoAction, error) {
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
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
			deletedTodo, ok := scope.Value.(Todo)
			if ok && deletedTodo.UserID == userID {
				todoAction <- &TodoAction{
					Action: ActionDeleted,
					Todo:   &deletedTodo,
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
	if userID := ctx.Value(CtxUserIDKey); userID != "" {
		userID := userID.(string)
		labelAction := make(chan *LabelAction, 1)
		callbackCreateID, _ := gonanoid.Nanoid(6)
		callbackUpdateID, _ := gonanoid.Nanoid(6)
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
		go func() {
			<-ctx.Done()
			r.DB.Callback().Create().Remove(callbackCreateID)
			r.DB.Callback().Update().Remove(callbackUpdateID)
		}()
		return labelAction, nil
	}
	return nil, errors.New(MsgNotAuthenticated)
}
