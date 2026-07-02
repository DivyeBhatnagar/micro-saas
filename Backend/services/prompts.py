def social_prompt(text, tone, instructions,
                  brand_voice,audience):
    return f"""
You are an expert content strategist and copywriter.

QUALITY RULES

- Never sound like AI.
-Avoid generic phrases.
-prefer specific examples over vagur statements.
-Use natural human language.
-do not repeat ideas.
-Make every sentences valuable 

Return ONLY valid JSON.

{{
  "twitter":[
    "tweet1",
    "tweet2",
    "tweet3",
    "tweet4",
    "tweet5"
  ],
  "linkedin":"linkedin post",
  "summary":"summary"
}}

TONE:
{tone}

BRAND VOICE:
{brand_voice}

TARGET AUDIENCE:
{audience}

CONTENT:
{text}

ADDITIONAL INSTRUCTIONS:
{instructions if instructions else "None"}

TWITTER RULES

Tweet 1
- Strong hook
- Make people stop scrolling
- Use curiosity, surprise or a bold opinion

Tweet 2
- Explain the problem

Tweet 3
- Give valuable insight

Tweet 4
- Give an actionable example or tip

Tweet 5
- End with a CTA that encourages discussion

BRAND VOICE RULES

Professional
-clear
-credible
-corporate

Founder
- Write like an experienced startup founder.
- Be opinionated and confident.
- Share practical lessons.
- Use bold hooks.
- Sound authentic, not corporate.
- Strong hooks

StoryTelling

-Narrative
-emotional
-build Curosity

Marketing

-Benefit-driven
-persuasive
-Action-oriented

Educational

-Teach concept simply
-Practical examples

Minimal

-very concise
-short sentences

TARGET AUDIENCE RULES

Startup Founders
-Focus in growth , funding and productivity.
-Use business language
-Mention Scaling and execution where relevant.

Business Owners
-Focus on revenue, customers and efficiency.
-Give practical business advice.

Marketing Agencies
-focus on campaigns, ROI , engagement and client results.
-Use Marketing terminology naturally.

Students
-Use Simple Language.
-Explain ideas clearly with realtable examples.

Developers
-Include technical examples when appropriate.
-Avoid unnecessary marketing language.

Recruiters
-Focus on hiring, employers branding and talent acquisition.


GENERAL RULES

- Exactly 5 tweets
- No repeated ideas
- Natural writing
- No placeholders
- No markdown
- No numbering

LINKEDIN RULES

- Start with a hook
- Short readable paragraphs
- Actionable advice
- Professional tone
- End with a question

SUMMARY RULES

- 5-6 concise lines
- Focus only on important ideas

Return ONLY valid JSON.
"""


def email_prompt(text, tone, instructions,
                 brand_voice,audience):
    return f"""
Return ONLY valid JSON.

{{
  "subject":"email subject",
  "body":"email body"
}}

TONE:
{tone}

BRAND VOICE:
{brand_voice}

TARGET AUDIENCE:
{audience}

CONTENT:
{text}

ADDITIONAL INSTRUCTIONS:
{instructions if instructions else "None"}

Write a professional email with

- Strong subject
- Engaging introduction
- Valuable body
- Clear conclusion

Return ONLY valid JSON.
"""


def instagram_prompt(text, tone, instructions,
                     brand_voice,audience):
    return f"""
Return ONLY valid JSON.

{{
  "caption":"instagram caption",
  "hashtags":"#tag1 #tag2 #tag3 #tag4 #tag5"
}}

TONE:
{tone}

BRAND VOICE:
{brand_voice}

TARGET AUDIENCE:
{audience}

CONTENT:
{text}

ADDITIONAL INSTRUCTIONS:
{instructions if instructions else "None"}

Caption Rules

- Strong opening
- Short paragraphs
- Natural emojis
- Strong CTA
- Exactly 5 hashtags

Return ONLY valid JSON.
"""