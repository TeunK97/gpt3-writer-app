import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [context, setContext] = useState({
    context1:"", context2:"", 
    context3:"", context4:"", 
    context5:"", context6:"", 
    context7:"", context8:""});
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (event) => {
    setContext({... context, [event.target.name]:event.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.group("context created", context);
    console.log(context.context1)
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context }),
    });

    const data = await response.json();
    const { output } = data; 
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  return (
    <div className="root">
      <Head>
        <title>The LinkedIn Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>The LinkedIn Milestone Generator for Students</h1>
          </div>
          <div className="header-subtitle">
            <h2>For anyone without inspiration, but still wants to post something on LinkedIn. Note that it may take some time to process your submission.
            </h2>
          </div>
        </div>
      </div>
      
      <div className="prompt-container">
          <div className="prompt-container2">
          <form onSubmit={handleSubmit}>
            
            <div className="prompt-item-1">
              <label htmlFor="context1">University:</label>
              <input type="text" name="context1" onChange={handleChange} />
            </div>

            <div className="prompt-item-2">
              <label htmlFor="context2">Degree title:</label>
              <input type="text" name="context2" onChange={handleChange} />
            </div>

            <div className="prompt-item-3">
              <label htmlFor="context3">Thesis title:</label>
              <input type="text" name="context3" onChange={handleChange} />
            </div>

            <div className="prompt-item-4">
              <label htmlFor="context4">Thesis supervisor:</label>
              <input type="text" name="context4" onChange={handleChange} />
            </div>

            <div className="prompt-item-5">
              <label htmlFor="context 6"> What is next?:
                <select name="context6" onChange={handleChange}>
                  <option value="Internship">Internship</option>
                  <option value="New job">New job</option>
                  <option value="Looking for jobs">Looking for jobs, next field fill in Yes or No</option>
                </select>
              </label>
            </div> 
            
            <div className="prompt-item-6">
              <label htmlFor="context7">Internship/job position and organisation/company:</label>
              <input type="text" name="context7" onChange={handleChange} />
            </div>


            <div className="prompt-item-7">
              <label htmlFor="context5">Challenge during study, e.g. Corona, breakup, etc.:</label>
              <input type="text" name="context5" onChange={handleChange} />
            </div>

            <div className="prompt-buttons">
                <a 
                  className= {isGenerating ? 'generate-button loading' : 'generate-button'}
                  onClick= {callGenerateEndpoint}>
                  <div className="generate">
                    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
            </div>
          </form>
        </div>
        {apiOutput && (
            <div className='output'>
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>

              
              <div className="linkedin-button">
              <a 
                href={
                  `https://www.linkedin.com/feed/?shareActive=true&view=new&text=` 
                  + encodeURIComponent(apiOutput)
                } 
                target="_blank" 
                class="linkedin-button">
                  <p>Post on LinkedIn</p>
              </a>
              </div>


      </div>
        )}
      </div>
    <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
