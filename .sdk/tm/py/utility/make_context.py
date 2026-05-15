# MonsterHunterWorld SDK utility: make_context

from core.context import MonsterHunterWorldContext


def make_context_util(ctxmap, basectx):
    return MonsterHunterWorldContext(ctxmap, basectx)
