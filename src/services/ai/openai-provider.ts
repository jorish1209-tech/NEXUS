import type { UserProfile } from "@/types";
import type { GenerationContext } from "@/services/generation/types";
import type { AIProvider, ChartContent, ShareContent, TodayContent } from "./types";
import { AIProviderUnavailableError } from "./types";

/** Reserved for a future server-side OpenAI implementation. It is not selected in Phase 2. */
export class OpenAIProvider implements AIProvider {
  private unavailable() {
    return new AIProviderUnavailableError("OpenAI provider is not enabled in this build");
  }

  async generateToday(_profile: UserProfile, _context: GenerationContext): Promise<TodayContent> { throw this.unavailable(); }
  async generateChart(_profile: UserProfile, _context: GenerationContext): Promise<ChartContent> { throw this.unavailable(); }
  async generateShare(_profile: UserProfile, _context: GenerationContext): Promise<ShareContent> { throw this.unavailable(); }
}
