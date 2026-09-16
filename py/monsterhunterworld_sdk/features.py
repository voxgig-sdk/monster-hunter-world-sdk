# MonsterHunterWorld SDK feature factory

from monsterhunterworld_sdk.feature.base_feature import MonsterHunterWorldBaseFeature
from monsterhunterworld_sdk.feature.ratelimit_feature import MonsterHunterWorldRatelimitFeature
from monsterhunterworld_sdk.feature.retry_feature import MonsterHunterWorldRetryFeature
from monsterhunterworld_sdk.feature.test_feature import MonsterHunterWorldTestFeature
from monsterhunterworld_sdk.feature.timeout_feature import MonsterHunterWorldTimeoutFeature


_FEATURES = {
    "base": lambda: MonsterHunterWorldBaseFeature(),
    "ratelimit": lambda: MonsterHunterWorldRatelimitFeature(),
    "retry": lambda: MonsterHunterWorldRetryFeature(),
    "test": lambda: MonsterHunterWorldTestFeature(),
    "timeout": lambda: MonsterHunterWorldTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
