# Artist / Work Card Fidelity Control Sheet

| Planned element | Responsible file | Evidence | Status | Adjustment / next correction |
| --- | --- | --- | --- | --- |
| Desktop Artist card coordinates | `styles/reference-master.css` | `qa/card-fidelity-desktop-artists-pass1.png`; `tests/card-fidelity.test.mjs` | matched | Five approved positions retained exactly. |
| Mobile Artist card layout | `styles/reference-master.css` | `qa/card-fidelity-mobile-artists-pass1.png`; `tests/card-fidelity.test.mjs` | matched | Approved 18px edges and 28px baseline retained. |
| Artist uploaded colors | `styles/reference-master.css` | Desktop/mobile Artist screenshots | adjusted | Removed grayscale, brightness reduction, and reduced opacity. |
| Desktop Work card coordinates | `styles/reference-master.css` | `qa/card-fidelity-desktop-work-pass1.png`; `tests/card-fidelity.test.mjs` | matched | Four approved positions retained exactly. |
| Mobile Work card layout | `styles/reference-master.css` | `qa/card-fidelity-mobile-work-pass1.png`; `tests/card-fidelity.test.mjs` | matched | Approved 18px edges and 35px baseline retained. |
| Work uploaded colors | `styles/reference-master.css` | Desktop/mobile Work screenshots | adjusted | Removed grayscale, brightness reduction, and reduced opacity. |
| Frozen six-section geometry | `styles/reference-master.css` | Full test suite | matched | No section height or non-card layout changes. |

Known delta: individual source images retain their native color treatment; a source that is itself monochrome is not artificially recolored.
