import requests

# This endpoint exposes an unofficial free API compatible with the OpenAI format
API_URL = "https://api.aichatos.xyz/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

def ask_gpt(prompt: str) -> str:
    """Call the free GPT API and return the answer."""
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
    }
    response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=30)
    response.raise_for_status()
    data = response.json()
    return data.get("choices", [{}])[0].get("message", {}).get("content", "")
