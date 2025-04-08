**Assignment 1 Answers: Understanding RAG and Embeddings**

---

**1. Evolution of Embeddings**

- **TF-IDF Limitation Solved by Word2Vec**: TF-IDF only captures word frequency and cannot understand the meaning or context of words. It treats each word independently and fails to recognize synonyms or semantic relationships. Word2Vec addressed this by learning dense vector representations that place semantically similar words closer together in vector space.

- **LSTM Limitation Solved by Transformer Attention**: LSTMs process text sequentially and struggle with long-range dependencies due to vanishing gradients and limited memory. The Transformer’s self-attention mechanism allows the model to consider all words in the input simultaneously, effectively capturing long-distance relationships without sequential bottlenecks.

---

**2. BERT's Contribution: Significance of Bidirectional Training**

BERT’s bidirectional pre-training (Masked Language Modeling) allows the model to learn from both left and right contexts simultaneously. This contrasts with previous models like GPT (unidirectional) and improves BERT’s understanding of word relationships within context, enabling deeper comprehension of language nuances.

---

**3. Comparison Table: SBERT vs. OpenAI Ada**

| Feature              | Sentence-BERT (Local)              | OpenAI text-embedding-ada-002        |
|----------------------|------------------------------------|--------------------------------------|
| Hosting              | Local / Self-hosted                | Cloud API (OpenAI)                   |
| Cost                 | Free (compute only)                | Pay-per-use                          |
| Privacy              | High (data stays local)            | Lower (data sent to OpenAI)          |
| Ease of Use          | Moderate (setup required)          | Very Easy (plug-and-play API)        |
| Dimensionality       | 384 / 768 / 1024 (varies by model) | 1536                                 |
| Max Input Tokens     | ~512 (varies)                      | 8191                                 |
| Performance          | Depends on local hardware          | Fast and optimized                   |
| Quality              | High (task-specific fine-tuning)   | Very High (general-purpose)          |
| Customization        | High (fine-tune or choose models)  | None                                 |

---

**4. Chunking Scenario: Large 1000-Page PDF**

- **Why Chunking is Necessary**:
  - Most embedding models (like BERT) have input limits (e.g., 512 tokens).
  - Chunking allows us to process long documents by breaking them into smaller parts that fit the model.
  - It improves retrieval precision by narrowing search to relevant document segments.

- **Two Chunking Strategies**:
  1. **Fixed-Size Chunking**: Divide the text into equal-sized blocks (e.g., 500 characters). Easy to implement but may split concepts awkwardly.
  2. **Recursive Character Text Splitting**: Split using a hierarchy of delimiters (e.g., paragraphs > sentences > words) to maintain coherence.

- **Factors Influencing Chunk Size and Overlap**:
  - Model token limit (must stay under max input size)
  - Content density (technical text might need smaller chunks)
  - Desired retrieval accuracy (smaller chunks = finer granularity)
  - Chunk overlap (10-20%) helps preserve meaning across boundaries

---

**5. Model Selection Rationale**

- **Startup building a quick prototype chatbot for public website FAQs**:
  - **Best Fit**: OpenAI Ada
  - **Reason**: Fast, easy to integrate, no setup overhead, high quality, low privacy concern.

- **Hospital developing an internal system for sensitive patient summaries**:
  - **Best Fit**: Local SBERT
  - **Reason**: High data privacy, no external data transfer, customizable, good semantic search.

- **Solo developer building a personal note-taking app with semantic search (on desktop)**:
  - **Best Fit**: Local SBERT
  - **Reason**: Cost-free, private, flexible, suitable for offline use, manageable on personal hardware.


