---
title: "Single LLM Debate, MoLaCE: Mixture of Latent Concept Experts Against Confirmation Bias"
authors: "Hazel Kim, Philip Torr"
venue: "Preprint"
paper_pdf: https://arxiv.org/pdf/2512.23518
thumb: /assets/paper-thumbs/molace.svg
summary: "Introduces MoLaCE, an inference-time method that mixes latent-concept experts so a single LLM can resist confirmation bias—emulating multi-agent debate more efficiently and reducing echo-chamber effects."
---

## Overview

Large language models often reinforce their own early answers, locking into a confirmation-biased trajectory. Multi-agent debate can help, but it is expensive and still depends on several model calls.

**MoLaCE** (Mixture of Latent Concept Experts) turns that idea inward: instead of debating across separate models, it mixes latent-concept experts inside a single model at inference time. The result is a lighter-weight surrogate for multi-agent debate that reduces echo-chamber effects without retraining.

## Why it matters

Confirmation bias is especially damaging when models are asked to revise or critique their own reasoning. MoLaCE targets that failure mode directly, offering a practical test-time control knob for more balanced generation.

## Paper

[Read the PDF on arXiv](https://arxiv.org/pdf/2512.23518)
