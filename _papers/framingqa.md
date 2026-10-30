---
title: "FramingQA: Does the Question Shape the Answer? Measuring the Compositional Framing Effect"
authors: "Hazel H. Kim, Andrew M Bean, Guilherme Affonso Ferreira de Camargo, Shanyu Chauhan, Felix Drinkall, Jade Kosché, Chenyang Ma, Glory Nwaugbala, Nabeel Seedat, Bradley Max Segal, Samuel Recht, Hinrich Schütze, Philip H.S. Torr"
venue: "Preprint"
paper_pdf: https://arxiv.org/pdf/2609.07448
thumb: /assets/paper-thumbs/framingqa.svg
summary: "Introduces FramingQA, a benchmark of how question framing shifts LLM answers in law, medicine, finance, and robotics, even when the underlying facts stay fixed."
---

## Overview

Large language models often change their answer when a question is rephrased to imply a stance, even if the facts do not change. That is costly in law, medicine, finance, and robotics, where both experts and non-experts ask questions that already contain incomplete or misleading assumptions.

**FramingQA** measures that sensitivity at three nested levels: a biased question, a biased premise in front of a neutral question, and a biased premise paired with a biased question. Across nine open models, strong accuracy on a single phrasing does not mean the model stays consistent when the framing changes.

## Why it matters

A model can look reliable on average and still give different advice for the same facts, depending on how the question was asked. FramingQA makes that gap visible.

## Paper

[Read the PDF on arXiv](https://arxiv.org/pdf/2609.07448)
