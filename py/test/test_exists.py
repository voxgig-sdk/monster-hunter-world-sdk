# ProjectName SDK exists test

import pytest
from monsterhunterworld_sdk import MonsterHunterWorldSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MonsterHunterWorldSDK.test(None, None)
        assert testsdk is not None
