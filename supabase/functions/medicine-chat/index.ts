import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompt in Hindi for medicine information
    const systemPrompt = `आप एक विशेषज्ञ मेडिकल AI असिस्टेंट हैं जो दवाओं के बारे में जानकारी देते हैं।

आपकी जिम्मेदारियां:
1. हमेशा हिंदी में सरल भाषा में जवाब दें
2. दवा के बारे में विस्तृत जानकारी दें:
   - दवा का नाम (ब्रांड और जेनेरिक)
   - उपयोग और फायदे
   - कैसे काम करती है
   - खुराक की जानकारी
   - संभावित साइड इफेक्ट्स
   - सावधानियां और चेतावनी
   - भंडारण की जानकारी
3. कभी भी कीमत न बताएं
4. उपयोगकर्ता को सलाह दें कि वे डॉक्टर से परामर्श लें
5. अगर दवा के बारे में पूरी जानकारी न हो, तो स्पष्ट रूप से बताएं

हमेशा सटीक, मददगार और सुरक्षित जानकारी दें।`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded',
            response: 'क्षमा करें, बहुत सारे अनुरोध हो रहे हैं। कृपया थोड़ी देर बाद पुनः प्रयास करें।'
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'Payment required',
            response: 'AI सेवा अस्थायी रूप से अनुपलब्ध है। कृपया बाद में पुनः प्रयास करें।'
          }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const aiResponse = data.choices?.[0]?.message?.content || 'क्षमा करें, मुझे जवाब नहीं मिला।';

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in medicine-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        response: 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
