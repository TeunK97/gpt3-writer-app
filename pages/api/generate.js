import { Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
    const { context } = req.body;
  
    const basePromptPrefix = `
      Write me a LinkedIn post based on the context below.\n
      University: ${context.context1}\n
      Milestone: ${context.context2} \n
      Thesis title: ${context.context3} \n
      Put your thesis title in quotations and explain the skills you have learned during your study.\n
      Thesis supervisor: ${context.context4} \n
      Mention the characteristics of the supervisor that were inspiring to you and made him/her a great guide during the thesis. \n
      Challenge during study: ${context.context5} \n
      Write about the impact this challenge had on your study. \n
      ${context.context6} : ${context.context7} \n
      Mention what made you choose for this ${context.context6} \n
      Use LinkedIn style (use emoji's). Make paragraphs, do not title the paragraphs. End with something motivational and hashtags. ${context.context8} tone of voice
    `;
  
    try {
      const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}\n`,
        temperature: 1,
        max_tokens: 700,
      });
  
      const basePromptOutput = baseCompletion.data.choices.pop();

      const fixedGrammarEdit = await openai.createEdit({
        model : "text-davinci-edit-001",
        input : `${basePromptOutput.text}`,
        instruction : "Fix the spelling and grammar.",
      });

      const fixedGrammarOutput = fixedGrammarEdit.data.choices.pop();

      res.status(200).json({ output: fixedGrammarOutput });
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export default generateAction;
