package core

type NextbikeError struct {
	IsNextbikeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNextbikeError(code string, msg string, ctx *Context) *NextbikeError {
	return &NextbikeError{
		IsNextbikeError: true,
		Sdk:              "Nextbike",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NextbikeError) Error() string {
	return e.Msg
}
