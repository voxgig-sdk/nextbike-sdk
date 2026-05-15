# Nextbike SDK utility: make_context

from core.context import NextbikeContext


def make_context_util(ctxmap, basectx):
    return NextbikeContext(ctxmap, basectx)
