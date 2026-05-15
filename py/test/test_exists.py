# ProjectName SDK exists test

import pytest
from nextbike_sdk import NextbikeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NextbikeSDK.test(None, None)
        assert testsdk is not None
