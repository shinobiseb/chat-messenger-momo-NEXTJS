#!/usr/bin/env python

import git_filter_repo

def blob_callback(blob, callback_metadata):
    blob.data = blob.data.replace(b'd1', b'asdf')

# Args deduced from:
# print(git_filter_repo.FilteringOptions.parse_args(['--refs', 'HEAD', '--force'], error_on_empty=False))
args = git_filter_repo.FilteringOptions.default_options()
args.force = True
args.partial = True
args.refs = ['HEAD']
args.repack=False
args.replace_refs='update-no-add'

git_filter_repo.RepoFilter(
   args,
   blob_callback=blob_callback
).run()