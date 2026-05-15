package core

type MonsterHunterWorldError struct {
	IsMonsterHunterWorldError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMonsterHunterWorldError(code string, msg string, ctx *Context) *MonsterHunterWorldError {
	return &MonsterHunterWorldError{
		IsMonsterHunterWorldError: true,
		Sdk:              "MonsterHunterWorld",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MonsterHunterWorldError) Error() string {
	return e.Msg
}
