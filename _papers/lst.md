---
title: "LST: Lexicon-Guided Self-Training for Few-Shot Text Classification"
authors: "Hazel Kim*, Jaeman Son*, Yo-Sub Han"
venue: "Arxiv"
paper_pdf: https://arxiv.org/pdf/2202.02566.pdf
thumb: /assets/paper-thumbs/lst.svg
summary: "Improves few-shot self-training by guiding pseudo-labels with a refined lexicon, reducing overconfident early errors when only a handful of labeled examples are available."
---

## Overview

Self-training can amplify early mistakes when labels are scarce. **LST** guides few-shot self-training with a refined lexicon so pseudo-labels are less likely to reinforce overconfident errors.

The approach is aimed at settings with only a handful of labeled examples, where standard self-training often collapses too quickly.

## Why it matters

Pseudo-label noise is one of the main barriers to self-training in the few-shot regime. Lexicon guidance offers a lightweight prior that keeps early iterations more stable.

## Paper

[Read the PDF on arXiv](https://arxiv.org/pdf/2202.02566.pdf)
