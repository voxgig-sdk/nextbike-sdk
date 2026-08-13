# Nextbike SDK feature factory

from nextbike_sdk.feature.base_feature import NextbikeBaseFeature
from nextbike_sdk.feature.test_feature import NextbikeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NextbikeBaseFeature(),
        "test": lambda: NextbikeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
