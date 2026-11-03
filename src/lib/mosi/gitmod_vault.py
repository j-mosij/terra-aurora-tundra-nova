#!/usr/bin/env python3
"""Gitmod policy. Stdlib only.

A public git repository cannot contain a private directory. This tool
refuses to write plaintext secrets and will not create a hidden folder
that pretends to be private.
"""

import argparse
import sys


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Gitmod vault policy")
    parser.add_argument("--write-secret", action="store_true", help="attempt a plaintext write (always refused)")
    parser.add_argument("--check", action="store_true", help="print the policy and exit 0")
    args = parser.parse_args(argv)
    if args.write_secret:
        sys.stderr.write("refused: plaintext secrets are not written to the tree\n")
        return 2
    sys.stdout.write(
        "gitmod: public trees stay public. ciphertext only, and only in memory. no private subfolder is created.\n"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
