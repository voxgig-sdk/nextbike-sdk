# Nextbike SDK feature factory

from feature.base_feature import NextbikeBaseFeature
from feature.test_feature import NextbikeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NextbikeBaseFeature(),
        "test": lambda: NextbikeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
