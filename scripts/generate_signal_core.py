#!/usr/bin/env python3
"""KeJiShuCloud 品牌视觉：确定性生成三维测绘感信号核心 SVG。"""

from __future__ import annotations

import math
from pathlib import Path
from xml.sax.saxutils import escape

BASE = Path(__file__).resolve().parents[1]
DEST = BASE / "public" / "media" / "signal-core.svg"
CX, CY, R = 550.0, 495.0, 267.0


def projection(lat: float, lon: float) -> tuple[float, float, float]:
    """将球面经纬线映射为带旋转的正交三维投影。

    :param lat: 球面纬度（弧度）
    :param lon: 球面经度（弧度）
    :return: 屏幕 x、y 与观察深度 z
    """
    x = math.cos(lat) * math.cos(lon)
    y = math.sin(lat)
    z = math.cos(lat) * math.sin(lon)
    angle_y, angle_x = 0.53, -0.31
    xx = x * math.cos(angle_y) + z * math.sin(angle_y)
    zz = -x * math.sin(angle_y) + z * math.cos(angle_y)
    yy = y * math.cos(angle_x) - zz * math.sin(angle_x)
    depth = y * math.sin(angle_x) + zz * math.cos(angle_x)
    return CX + xx * R, CY + yy * R, depth


def traced_segment(pts: list[tuple[float, float]], precision: int = 1) -> str:
    """生成可重复的 SVG 路径命令。

    :param pts: 采样点数组
    :param precision: 坐标小数位数
    :return: SVG path data
    """
    if not pts:
        return ""
    fmt = f"{{:.{precision}f}}"
    return "M" + " L".join(f"{fmt.format(x)},{fmt.format(y)}" for x, y in pts)


def sphere_paths() -> list[str]:
    """生成真实三维经纬参考网格，隐藏球背部分。

    :return: 按深度区分的路径数组
    """
    out: list[str] = []
    for lat_i in range(-11, 12):
        lat = lat_i * math.pi / 25
        front: list[tuple[float, float]] = []
        for idx in range(321):
            x, y, z = projection(lat, idx / 320 * math.tau)
            if z > 0.008:
                front.append((x, y))
            elif len(front) > 1:
                out.append(f'<path d="{traced_segment(front)}" stroke="#799bff" opacity=".24" stroke-width=".85"/>')
                front = []
            else:
                front = []
        if len(front) > 1:
            out.append(f'<path d="{traced_segment(front)}" stroke="#799bff" opacity=".24" stroke-width=".85"/>')
    for longitude in range(0, 180, 9):
        lon = longitude * math.pi / 90
        pts: list[tuple[float, float]] = []
        for idx in range(221):
            x, y, z = projection(-math.pi / 2 + idx / 220 * math.pi, lon)
            if z > 0.008:
                pts.append((x, y))
            elif len(pts) > 1:
                out.append(f'<path d="{traced_segment(pts)}" stroke="#bdd2ff" opacity=".23" stroke-width=".8"/>')
                pts = []
            else:
                pts = []
        if len(pts) > 1:
            out.append(f'<path d="{traced_segment(pts)}" stroke="#bdd2ff" opacity=".23" stroke-width=".8"/>')
    return out


def orbit_paths() -> list[str]:
    """生成精密轨道、信号环及刻度，用于品牌表达而非虚构数据。

    :return: SVG 轨道与刻度节点数组
    """
    out: list[str] = []
    for i in range(9):
        rx = 337 + i * 12
        ry = 120 + (i % 3) * 10
        rotation = -38 + i * 10
        alpha = .13 + (i % 5) * .037
        out.append(
            f'<ellipse cx="{CX:.0f}" cy="{CY:.0f}" rx="{rx}" ry="{ry}" '
            f'transform="rotate({rotation} {CX:.0f} {CY:.0f})" '
            f'stroke="{"#b9c9ff" if i % 2 else "#6587fa"}" stroke-width=".85" opacity="{alpha:.3f}"/>'
        )
    for angle in range(0, 360, 3):
        theta = math.radians(angle - 90)
        major = angle % 30 == 0
        rr = 332 if major else 337
        outer = 356 if major else 344
        x1, y1 = CX + rr * math.cos(theta), CY + rr * math.sin(theta)
        x2, y2 = CX + outer * math.cos(theta), CY + outer * math.sin(theta)
        op = ".52" if major else ".16"
        out.append(f'<path d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f}" stroke="#b7ccff" stroke-width="{1.4 if major else .8}" opacity="{op}"/>')
    for idx, angle in enumerate(range(0, 360, 30)):
        theta = math.radians(angle - 90)
        x, y = CX + 380 * math.cos(theta), CY + 380 * math.sin(theta)
        out.append(f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="middle" dominant-baseline="middle" fill="#8195c4" opacity=".65" font-family="monospace" font-size="9" letter-spacing="2">{idx:02d}</text>')
    return out


def energy_ribbons() -> list[str]:
    """生成克制的能量等势线，形成可辨识的三维层次。

    :return: 静态 SVG 曲线数组
    """
    out: list[str] = []
    for n in range(38):
        a = (n / 38) * math.tau
        rr = 242 + 41 * math.sin(a * 3 + .25)
        pts = []
        for i in range(160):
            t = i / 159 * math.tau
            x = CX + rr * math.cos(t) * (0.83 + .24 * math.sin(a * 2))
            y = CY + rr * math.sin(t) * .44
            x, y = (
                CX + (x - CX) * math.cos(a * .22) - (y - CY) * math.sin(a * .22),
                CY + (x - CX) * math.sin(a * .22) + (y - CY) * math.cos(a * .22),
            )
            x += 21 * math.sin(t * 2 + a)
            y += 36 * math.sin(t * 3 + a) * .18
            pts.append((x, y))
        alpha = .045 + .006 * (n % 6)
        out.append(f'<path d="{traced_segment(pts)}" stroke="#a8b9ff" opacity="{alpha:.3f}" stroke-width=".85"/>')
    return out


def signal_dots() -> list[str]:
    """根据确定性参数生成轨道光点，而非随机装饰数据。

    :return: SVG 点阵元素
    """
    dots = []
    for i in range(420):
        lat = math.asin(-1 + 2 * (i + .5) / 420)
        lon = i * 2.399963229728653
        x, y, depth = projection(lat, lon)
        if depth < .08:
            continue
        alpha = .12 + .42 * depth
        rad = .58 + (i % 9 == 0) * .86
        dots.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rad:.2f}" fill="{"#dde7ff" if i%13 else "#b5a4ff"}" opacity="{alpha:.2f}"/>')
    return dots


def build_svg() -> str:
    """组合无外链的矢量资产，适合作为可控首屏静态降级。

    :return: 独立 SVG 文档字符串
    """
    chunks = ['''<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="980" viewBox="0 0 1100 980" fill="none" role="img" aria-label="Precision orbital signal sculpture">
<defs>
 <radialGradient id="halo"><stop stop-color="#2d59ff" stop-opacity=".21"/><stop offset=".48" stop-color="#2337a7" stop-opacity=".13"/><stop offset="1" stop-color="#0a0e1d" stop-opacity="0"/></radialGradient>
 <radialGradient id="shell" cx=".29" cy=".19" r=".84"><stop stop-color="#718cff" stop-opacity=".76"/><stop offset=".20" stop-color="#2a48af" stop-opacity=".24"/><stop offset=".62" stop-color="#142451" stop-opacity=".55"/><stop offset="1" stop-color="#030713" stop-opacity=".96"/></radialGradient>
 <radialGradient id="inner"><stop stop-color="#020615"/><stop offset=".76" stop-color="#0a1735"/><stop offset=".92" stop-color="#324eb1"/><stop offset="1" stop-color="#9bafff"/></radialGradient>
 <linearGradient id="bright" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#afafff"/><stop offset=".36" stop-color="#eff8ff"/><stop offset=".8" stop-color="#5377ff"/><stop offset="1" stop-color="#8b77ff"/></linearGradient>
 <filter id="bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="19"/></filter>
 <filter id="microbloom" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="3.3"/></filter>
 <clipPath id="sphere"><circle cx="550" cy="495" r="267"/></clipPath>
</defs>
<circle cx="550" cy="495" r="410" fill="url(#halo)"/>
<circle cx="550" cy="495" r="290" fill="#3659f5" opacity=".15" filter="url(#bloom)"/>
<g>''']
    chunks.extend(orbit_paths())
    chunks.append('''</g>
<circle cx="550" cy="495" r="267" fill="url(#shell)" stroke="#7d99ff" stroke-width="1.2" stroke-opacity=".42"/>
<g clip-path="url(#sphere)">''')
    chunks.extend(energy_ribbons())
    chunks.extend(sphere_paths())
    chunks.extend(signal_dots())
    chunks.append('''</g>
<circle cx="550" cy="495" r="161" fill="#141a30" opacity=".38" filter="url(#bloom)"/>
<circle cx="550" cy="495" r="154" fill="url(#inner)" stroke="url(#bright)" stroke-opacity=".76" stroke-width="1.8"/>
<circle cx="550" cy="495" r="133" stroke="#9bb6ff" stroke-opacity=".24"/>
<circle cx="550" cy="495" r="117" stroke="#cdd8ff" stroke-opacity=".1"/>
<circle cx="550" cy="495" r="87" stroke="#879bff" stroke-opacity=".13"/>
<path d="M419 430 A145 145 0 0 1 643 380" stroke="url(#bright)" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>
<path d="M690 552 A145 145 0 0 1 485 633" stroke="#bdaeff" stroke-width="2" stroke-linecap="round" opacity=".77"/>
<path d="M478 489 H522 M578 489 H622 M550 439 V475 M550 514 V551" stroke="#ccd8ff" stroke-opacity=".43" stroke-width="1.2"/>
<circle cx="550" cy="495" r="7" fill="#dce9ff"/>
<circle cx="550" cy="495" r="23" stroke="#89a4ff" stroke-opacity=".75"/>
<circle cx="550" cy="495" r="2" fill="#fff" filter="url(#microbloom)"/>
<g fill="#d2ddff" font-family="monospace" font-size="11" letter-spacing="3">
 <text x="550" y="586" text-anchor="middle">K / N O D E</text>
 <text x="550" y="607" text-anchor="middle" fill="#8497cd" font-size="8">RESEARCH · ENGINEERING</text>
</g>
<g stroke="#94b2ff" stroke-opacity=".62" stroke-width="1">
 <path d="M779 302 H929 M779 302 l-27 25"/>
 <path d="M300 686 H117 M300 686 l41 -33"/>
 <path d="M713 755 H906 M713 755 l-22 -29"/>
</g>
<g font-family="monospace" font-size="10" letter-spacing="2.5" fill="#a9bbec">
 <text x="932" y="298">NODE / CORE</text>
 <text x="117" y="677">FIELD A / 03</text>
 <text x="906" y="768" text-anchor="end">PROCEDURAL  /  001</text>
</g>
<circle cx="779" cy="302" r="3.2" fill="#b6ccff"/>
<circle cx="300" cy="686" r="3.2" fill="#a999ff"/>
<circle cx="713" cy="755" r="3.2" fill="#f2f6ff"/>
</svg>''')
    return "".join(chunks)


def main() -> None:
    """生成矢量资产。

    :return: None
    :raises OSError: 写入权限不足
    """
    DEST.parent.mkdir(parents=True, exist_ok=True)
    svg = build_svg()
    DEST.write_text(svg, encoding="utf-8")
    print(f"Generated {DEST} ({len(svg):,} chars)")


if __name__ == "__main__":
    main()
