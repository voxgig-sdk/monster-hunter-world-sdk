# MonsterHunterWorld SDK feature factory

from feature.base_feature import MonsterHunterWorldBaseFeature
from feature.test_feature import MonsterHunterWorldTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MonsterHunterWorldBaseFeature(),
        "test": lambda: MonsterHunterWorldTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
