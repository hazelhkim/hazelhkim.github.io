---
title: "ALP: Data Augmentation Using Lexicalized PCFGs for Few-Shot Text Classification"
authors: "Hazel Kim, Daecheol Woo, Seong Joon Oh, Jeong-Won Cha, Yo-Sub Han"
venue: "AAAI 2022"
pdf: /assets/docs/AAAI22.pdf
paper_pdf: /assets/docs/AAAI22.pdf
external_pdf: https://ojs.aaai.org/index.php/AAAI/article/view/21336
thumb: /assets/paper-thumbs/alp.svg
summary: "Generates syntactically diverse, label-preserving text with lexicalized PCFGs for few-shot classification, and pairs this with augmentation-aware train/validation splitting for stronger low-resource training."
---

## Overview

Few-shot text classification needs more than copies of the same sentences. **ALP** uses lexicalized PCFGs to generate syntactically diverse, label-preserving text for data augmentation.

The method is paired with an augmentation-aware train/validation split so models benefit from the extra data without leaking inflated validation scores.

## Why it matters

In low-resource settings, synthetic diversity can matter as much as volume. ALP focuses on structure-preserving augmentation that still changes surface form enough to help generalization.

## Paper

The full paper is embedded below. You can also [download the PDF](/assets/docs/AAAI22.pdf) or view it on the [AAAI proceedings site](https://ojs.aaai.org/index.php/AAAI/article/view/21336).
