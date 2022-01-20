import React from "react";
import { InlineShareButtons } from 'sharethis-reactjs';
import { InlineReactionButtons } from 'sharethis-reactjs';
// import { GithubCounter,GithubSelector,ReactionBarSelector,ReactionCounter } from '@charkour/react-reactions';

// export const Reaction = () => {
//     return (
//         <div className="w-full">
//             <GithubCounter />
//         </div>
//     )
// }

export class Share extends React.Component {

    render() {
        return (
            <div className="">
                <InlineShareButtons
                    config={{
                        alignment: 'left',  // alignment of buttons (left, center, right)
                        color: 'social',      // set the color of buttons (social, white)
                        enabled: true,        // show/hide buttons (true, false)
                        font_size: 16,        // font size for the buttons
                        labels: null,        // button labels (cta, counts, null)
                        language: 'en',       // which language to use (see LANGUAGES)
                        networks: [           // which networks to include (see SHARING NETWORKS)
                            'twitter',
                            'weibo',
                            'wechat',
                        ],
                        padding: 7,          // padding within buttons (INTEGER)
                        radius: 9,            // the corner radius on each button (INTEGER)
                        show_total: false,
                        size: 25,             // the size of each button (INTEGER)

                        // // OPTIONAL PARAMETERS           
                        // description: 'custom text',       // (defaults to og:description or twitter:description)
                        // title: 'custom title',            // (defaults to og:title or twitter:title)
                        // message: 'custom email text',     // (only for email sharing)
                        // subject: 'custom email subject',  // (only for email sharing)
                        // username: 'custom twitter handle' // (only for twitter sharing)
                    }}
                />
            </div>
        );
    }
};

export class Reaction extends React.Component {

  render () {
    return (
      <div className="Reaction">
        <style dangerouslySetInnerHTML={{__html: `
        .Reaction{
          margin: -5px 0;
        }
        }
      `}} />
      <h1 className="text-xl text-center">🤔 What do you think?</h1>
      <InlineReactionButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            enabled: true,        // show/hide buttons (true, false)
            language: 'en',       // which language to use (see LANGUAGES)
            min_count: 0,         // hide react counts less than min_count (INTEGER)
            padding: 12,          // padding within buttons (INTEGER)
            reactions: [          // which reactions to include (see REACTIONS)
              'slight_smile',
              'astonished',
              'sob',
              'rage'
            ],
            size: 40,             // the size of each button (INTEGER)
            radius: 0,
            show_total: true,
            // OPTIONAL PARAMETERS
          }}
        />  
      </div>    
    )
  }
}    