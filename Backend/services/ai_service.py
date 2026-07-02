from dotenv import load_dotenv
import os
import json
import google.generativeai as genai

from services.prompts import (
    social_prompt,
    email_prompt,
    instagram_prompt
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_content(text,
                      tone,
                     content_format ,
                     instructions="",
                     brand_voice="professional",
                     audience="Startup Founders"
                     ):

    prompt_builders = {
        "social": social_prompt,
        "email": email_prompt,
        "instagram": instagram_prompt
    }

    if content_format not in prompt_builders:
        return {
            "error": "Unsupported format"
        }

    prompt = prompt_builders[content_format](
        text, 
        tone, 
        instructions,
        brand_voice,
        audience
        )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "response_mime_type": "application/json"
            }
        )

        reply = response.text.strip()

        reply = (
            reply.replace("```json", "")
                 .replace("```", "")
                 .strip()
        )

        parsed = json.loads(reply)

        if content_format == "social":

            if "twitter" not in parsed:
                return {
                    "error": "Missing twitter array"
                }

            if not isinstance(parsed["twitter"], list):
                return {
                    "error": "Twitter is not a list"
                }

            if len(parsed["twitter"]) != 5:
                return {
                    "error": "Expected exactly 5 tweets",
                    "raw": parsed
                }

            if "linkedin" not in parsed:
                return {
                    "error": "Missing linkedin post"
                }

            if "summary" not in parsed:
                return {
                    "error": "Missing summary"
                }

        elif content_format == "email":

            if "subject" not in parsed or "body" not in parsed:
                return {
                    "error": "Invalid email response",
                    "raw": parsed
                }

        elif content_format == "instagram":

            if "caption" not in parsed or "hashtags" not in parsed:
                return {
                    "error": "Invalid instagram response",
                    "raw": parsed
                }

        return parsed

    except json.JSONDecodeError:

        return {
            "error": "Invalid JSON returned by AI",
            "raw": reply
        }

    except Exception as e:

        return {
            "error": str(e)
        }