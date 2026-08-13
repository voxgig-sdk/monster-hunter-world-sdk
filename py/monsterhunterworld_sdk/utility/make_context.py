# MonsterHunterWorld SDK utility: make_context

from monsterhunterworld_sdk.core.context import MonsterHunterWorldContext


def make_context_util(ctxmap, basectx):
    return MonsterHunterWorldContext(ctxmap, basectx)
