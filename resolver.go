package googlekeep_clone

import (
	"context"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

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
	panic("not implemented")
}
func (r *mutationResolver) UpdateTodo(ctx context.Context, id string, title *string, notes []*string, labels []*string, color *string, isCheckboxMode *bool) (*Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, id string) (*Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) CopyTodo(ctx context.Context, sourceID string) (*Todo, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context) ([]*Todo, error) {
	panic("not implemented")
}
func (r *queryResolver) Labels(ctx context.Context) ([]*Label, error) {
	panic("not implemented")
}
func (r *queryResolver) User(ctx context.Context) (*User, error) {
	panic("not implemented")
}

type subscriptionResolver struct{ *Resolver }

func (r *subscriptionResolver) TodoCreated(ctx context.Context) (<-chan *Todo, error) {
	panic("not implemented")
}
func (r *subscriptionResolver) TodoDeleted(ctx context.Context) (<-chan *Todo, error) {
	panic("not implemented")
}
func (r *subscriptionResolver) TodoUpdated(ctx context.Context) (<-chan *Todo, error) {
	panic("not implemented")
}
