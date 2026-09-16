# Nextbike SDK feature factory

from nextbike_sdk.feature.base_feature import NextbikeBaseFeature
from nextbike_sdk.feature.ratelimit_feature import NextbikeRatelimitFeature
from nextbike_sdk.feature.retry_feature import NextbikeRetryFeature
from nextbike_sdk.feature.test_feature import NextbikeTestFeature
from nextbike_sdk.feature.timeout_feature import NextbikeTimeoutFeature


_FEATURES = {
    "base": lambda: NextbikeBaseFeature(),
    "ratelimit": lambda: NextbikeRatelimitFeature(),
    "retry": lambda: NextbikeRetryFeature(),
    "test": lambda: NextbikeTestFeature(),
    "timeout": lambda: NextbikeTimeoutFeature(),
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
