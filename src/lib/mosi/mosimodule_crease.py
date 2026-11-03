#!/usr/bin/env python3
"""Mosimodule crease generator. Python 3 stdlib only. No network. No secrets."""

import json
import math
import sys

PHI = (1 + math.sqrt(5)) / 2
GOLDEN_ANGLE = math.pi * (3 - math.sqrt(5))
GOLDEN_BETA = math.atan(1 / PHI)
CLASSIC_BETA = math.pi / 6


def fibonacci(n: int) -> list[int]:
    a, b = 1, 1
    out = []
    for _ in range(n):
        out.append(a)
        a, b = b, a + b
    return out


def phyllotaxis(count: int, scale: float = 0.052) -> list[dict[str, float]]:
    pts = []
    for i in range(count):
        radius = scale * math.sqrt(i)
        theta = i * GOLDEN_ANGLE
        pts.append({"i": i, "x": radius * math.cos(theta), "z": radius * math.sin(theta)})
    return pts


def check() -> None:
    cot = 1 / math.tan(GOLDEN_BETA)
    if abs(cot - PHI) > 1e-9:
        raise SystemExit("cot(beta) is not phi")
    deg = math.degrees(GOLDEN_BETA)
    if not 31.7 < deg < 31.73:
        raise SystemExit("golden beta out of range")
    if abs(math.degrees(CLASSIC_BETA) - 30) > 1e-9:
        raise SystemExit("classic beta is not 30")


def main() -> int:
    check()
    json.dump(
        {
            "phi": PHI,
            "golden_angle_deg": math.degrees(GOLDEN_ANGLE),
            "golden_beta_deg": math.degrees(GOLDEN_BETA),
            "classic_beta_deg": math.degrees(CLASSIC_BETA),
            "fibonacci": fibonacci(8),
            "phyllotaxis_8": phyllotaxis(8),
        },
        sys.stdout,
        indent=2,
    )
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
