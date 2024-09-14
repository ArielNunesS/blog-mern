export default function Post(){
    return (
        <div className="post">
            <img src="https://i.scdn.co/image/ab67616d0000b2731df557c6310e8711a310790a"></img>

            <div className="text">
                <h2>First impressions of OpenAI o1: An AI designed to overthink it</h2>

        <p className="info">
            <a className="author">Gustavo Guanabara</a>
            <time>2024-09-14</time>
        </p>

        <p className="content"> Compared to GPT-4o, the o1 models feel like one step forward and two steps back.
            OpenAI o1 excels at reasoning and answering complex questions, but the model is roughly four times more expensive to use than GPT-4o.
            OpenAI’s latest model lacks the tools, multimodal capabilities, and speed that made GPT-4o so impressive.
        </p>
            </div>
        </div>
    );
}
