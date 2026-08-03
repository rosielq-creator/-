from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def assert_transparent_safe_area(filename: str, minimum_inset: int = 6) -> None:
    image = Image.open(ROOT / "assets" / "brands" / filename).convert("RGBA")
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    assert bbox is not None, f"{filename} must contain visible logo pixels"

    left, top, right, bottom = bbox
    width, height = image.size
    assert left >= minimum_inset, f"{filename} content touches the left edge"
    assert top >= minimum_inset, f"{filename} content touches the top edge"
    assert width - right >= minimum_inset, f"{filename} content touches the right edge"
    assert height - bottom >= minimum_inset, f"{filename} content touches the bottom edge"

    for point in ((0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)):
        assert alpha.getpixel(point) == 0, f"{filename} must have a transparent background"


assert_transparent_safe_area("mgm-macau-white.png")
assert_transparent_safe_area("parknshop-white.png")

print("brand asset transparency and safe-area contract passed")
