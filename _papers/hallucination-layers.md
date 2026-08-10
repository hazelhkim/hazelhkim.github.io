---
title: "Detecting LLM Hallucination through Layer-wise Information Deficiency"
authors: "Hazel Kim, Tom A. Lamb, Adel Bibi, Philip Torr, Yarin Gal"
venue: "EMNLP 2025"
pdf: /assets/docs/EMNLP25.pdf
paper_pdf: /assets/docs/EMNLP25.pdf
external_pdf: https://arxiv.org/pdf/2412.10246
thumb: /assets/paper-thumbs/hallucination-layers.svg
summary: "Detects hallucinations at test time by tracking usable-information deficiencies across model layers—especially under ambiguous or unanswerable prompts—without extra training or architecture changes."
---

## Overview

Hallucinations are hard to catch when a model sounds fluent. This paper looks inside the network and asks whether usable information is missing as representations move through layers.

We propose a **layer-wise information deficiency** signal that flags hallucinations at test time, with particular strength on ambiguous or unanswerable prompts. The method needs no additional training and leaves the model architecture unchanged.

## Why it matters

A practical detector should work on frozen models and under realistic uncertainty. By reading information loss across layers, this approach offers a training-free check that complements decoding-time safeguards.

## Paper

The full paper is embedded below. You can also [download the PDF](/assets/docs/EMNLP25.pdf) or view it on [arXiv](https://arxiv.org/pdf/2412.10246).
