import { NextRequest, NextResponse } from "next/server";

import {
  summarizeText,
  rewriteText,
  improveWriting,
  grammarCheck,
   continueWriting,
   generateTitle,
   translateText,
   convertToBullets,
   changeTone,
   simplifyText,
   explainText, 
} from "@/src/services/ai.service";

import {
  summarizeSchema,
  rewriteSchema,
  improveSchema,
   grammarSchema,
   titleSchema ,
   translateSchema,
   continueWritingSchema,
   bulletSchema,
   toneSchema,
   simplifySchema,
   explainSchema,
} from "@/src/validators/ai.validation";


export async function summarize(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = summarizeSchema.parse(body);

    const result = await summarizeText(
      data.text
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Summarization failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function rewrite(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = rewriteSchema.parse(body);

    const result = await rewriteText(
      data.text
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Rewrite failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function improve(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = improveSchema.parse(body);

    const result = await improveWriting(
      data.text
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "AI improvement failed",
      },
      {
        status: 400,
      }
    );
  }
}

export async function grammar(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = grammarSchema.parse(body);

    const result = await grammarCheck(
      data.text
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Grammar check failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function continueText(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data =
      continueWritingSchema.parse(body);

    const result =
      await continueWriting(data.text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Continue writing failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function title(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = titleSchema.parse(body);

    const result = await generateTitle(
      data.text
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Title generation failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function translate(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data =
      translateSchema.parse(body);

    const result =
      await translateText(
        data.text,
        data.language
      );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Translation failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function bullets(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = bulletSchema.parse(body);

    const result =
      await convertToBullets(data.text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Bullet conversion failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function tone(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = toneSchema.parse(body);

    const result = await changeTone(
      data.text,
      data.tone
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Tone change failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function simplify(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data =
      simplifySchema.parse(body);

    const result =
      await simplifyText(data.text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Simplification failed",
      },
      {
        status: 400,
      }
    );
  }
}


export async function explain(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data =
      explainSchema.parse(body);

    const result =
      await explainText(data.text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Explanation failed",
      },
      {
        status: 400,
      }
    );
  }
}