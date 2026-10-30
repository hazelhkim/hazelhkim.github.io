---
title: "What Hallucinations Have We Measured? Semantic Illusion, Confabulation, and Expressed Uncertainty"
authors: "Hazel H. Kim, Jakub Binkowski, Ekaterina Fadeeva, Juan David Guerra, Yijie Hao, Zheng Yi Ho, Baixiang Huang, Buyun Liang, Siyuan Liang, Anh Tuan Luu, Potsawee Manakul, Niels Mündler-Sasahara, Aidar Myrzakhan, Shahrad Mohammadzadeh, Artem Shelmanov, Kai Shu, Ponhvoan Srey, Dacheng Tao, René Vidal, Haofei Yu, Lei Yu, Hongxiang Zhang, Yarin Gal, Hinrich Schütze, Philip H.S. Torr"
venue: "Preprint"
paper_pdf: https://arxiv.org/pdf/2610.38520
thumb: /assets/paper-thumbs/measured-hallucinations.svg
summary: "Defines hallucination as a confidently incorrect response, split into semantic illusion and confabulation by whether a semantically equivalent prompt recovers the correct answer, and kept separate from expressed uncertainty."
---

## Overview

The word hallucination is used for many different model failures, which makes the results hard to compare. This paper argues for a stricter definition: a hallucination is a confident incorrect answer. A response that says it does not know is expressed uncertainty, not a hallucination.

Confident errors then split by a re-elicitation test. If some equivalent prompt recovers the correct answer, the error is a semantic illusion. If none does, it is a confabulation. Re-evaluating recent detection and mitigation methods under this split shows that they do not treat the three cases the same way.

## Why it matters

Mixing these cases hides which failures a method actually catches. The paper recommends reporting semantic illusion, confabulation, and expressed uncertainty separately.

## Paper

[Read the PDF on arXiv](https://arxiv.org/pdf/2610.38520)
