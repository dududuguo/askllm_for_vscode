# README

## Features

- call local large language(LLM) model in [VSCode](https://code.visualstudio.com/)
- support select code, context history as prompts to LLM.

## Requirements

- Download for Mac [ollama](https://ollama.com/download/Ollama-darwin.zip) first.
- Windows [ollama](https://ollama.com/download/OllamaSetup.exe)
- The local model needs download from [ollama library](https://ollama.com/library)

```bash
# example for llama3
ollama run llama3   # auto download llama3
ollama list         # if list llama3, which success
ollama rm llama3    # remove llama3
```

## Extension Settings

- input 'ask llm' in the top buttom
- choose model
- ask question

## For more information

This project is suitable for coding without an internet connection, as most of the time we just forget an API or some function names. It can be frustrating when there's no internet access. This project simply integrates Ollama's API with VSCode to minimize the need to switch between applications. The model's responses will be temporarily stored in Markdown, and can be saved if necessary.

* [ollama](https://github.com/ollama/ollama)
* [ollama-js](https://github.com/ollama/ollama-js)
* [llama3](https://ollama.com/library/llama3)

If you think this extension needs more work or issue, feel free to report it or fork it. Thank you!

**Enjoy!**
