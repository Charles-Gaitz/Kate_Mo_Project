import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AboutSectionProps {
  theme: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const isStarWars = theme.name === 'Star Wars';
  const isBarbie = theme.name === 'Barbie';
  const isNature = theme.name === 'Nature';

  const starWarsFacts = [
    {
      title: "🌟 Jedi Master of Fun",
      preview: "Kate's Force powers include making anyone laugh...",
      full: "Kate has mastered the ancient Jedi art of bringing joy to others. Her Force sensitivity is off the charts - she can sense when someone needs a smile from three star systems away. Even Yoda would be impressed by her natural ability to turn any situation into an adventure!"
    },
    {
      title: "🚀 Millennium Falcon Pilot",
      preview: "Kate can navigate any social situation in less than 12 parsecs...",
      full: "Just like Han Solo with the Millennium Falcon, Kate can navigate through the most awkward social situations in record time. She's made the Kessel Run of turning strangers into best friends in less than 12 parsecs (okay, maybe 12 minutes, but who's counting?)!"
    },
    {
      title: "⚔️ Lightsaber Dance Master",
      preview: "Kate's dance moves are more elegant than a lightsaber duel...",
      full: "Kate's dance moves are so smooth, they make lightsaber combat look clunky. She once accidentally choreographed an entire cantina band performance just by walking to the bar. The Empire tried to recruit her, but she was too busy bringing peace to the galaxy through interpretive dance!"
    },
    {
      title: "🤖 Droid Whisperer",
      preview: "Kate speaks fluent Droid and can fix any problem...",
      full: "Kate has this amazing ability to communicate with any technology - from droids to Death Stars (though she prefers not to help with the latter). R2-D2 and C-3PO regularly ask her for advice on human relations. She's basically the galaxy's best tech support!"
    },
    {
      title: "🌌 Rebel Alliance Commander",
      preview: "Kate leads the resistance against boring conversations...",
      full: "Kate is the unofficial leader of the Rebel Alliance Against Boring Times. Her strategic mind can turn any dull meeting into an engaging discussion, and any quiet room into a place full of laughter. The Empire of Awkwardness doesn't stand a chance!"
    },
    {
      title: "💫 Chosen One of Kindness",
      preview: "Kate brings balance to the Force through pure awesomeness...",
      full: "The prophecy spoke of one who would bring balance to the Force, and that person is definitely Kate. Her kindness levels are so high they've broken every scanner in the galaxy. She makes Obi-Wan look like a grumpy Sith Lord in comparison!"
    }
  ];

  const barbieFacts = [
    {
      title: "💼 Kate's Dream Career Collection",
      preview: "Kate has mastered more careers than Barbie herself...",
      full: "Just like Barbie, Kate can be anything! She's been a teacher, a chef, a party planner, a problem solver, a comedian, and a professional mood-lifter all in the same day. Her resume is so impressive, even Barbie would be jealous!"
    },
    {
      title: "🏰 Kate's Dream House",
      preview: "Kate's house isn't pink, but it's filled with something better...",
      full: "Kate's dream house might not be pink plastic, but it's filled with something way more valuable - love, laughter, and the best snacks in town. Every room has a different vibe, and somehow she makes everywhere feel like home!"
    },
    {
      title: "👗 Kate's Fashion Sense",
      preview: "Kate's style is more iconic than any Barbie outfit...",
      full: "Kate doesn't need a walk-in closet full of pink outfits to look amazing. She has this incredible ability to make any outfit look fantastic, and her confidence is the best accessory she could ever wear!"
    },
    {
      title: "🚗 Kate's Dream Car",
      preview: "Kate's ride is cooler than any pink convertible...",
      full: "While Barbie has her pink convertible, Kate's got something better - the ability to make any journey an adventure! Whether it's a road trip or just a drive to the grocery store, Kate turns every ride into a fun experience!"
    },
    {
      title: "👯‍♀️ Kate's Squad Goals",
      preview: "Kate's friend group is more diverse than all of Barbie's friends combined...",
      full: "Kate doesn't just have Ken - she's got an entire squad of amazing friends who adore her! She's the kind of person who brings people together and makes everyone feel included. Her friendship circle is goals!"
    },
    {
      title: "✨ Kate's Superpowers",
      preview: "Kate's got powers that even Superhero Barbie would envy...",
      full: "Kate's superpowers include: making anyone laugh in 30 seconds, remembering everyone's favorite things, turning awkward moments into funny stories, and having the perfect thing to say at exactly the right time. She's basically a real-life superhero!"
    }
  ];

  const natureFacts = [
    {
      title: "🌱 Kate's Green Thumb Magic",
      preview: "Kate can make anything grow, including friendships...",
      full: "Kate has this incredible ability to nurture everything around her - from plants to people to dreams. She's like a walking garden of positivity, making everyone bloom just by being near them. Even wilted flowers perk up when Kate walks by!"
    },
    {
      title: "🦋 Butterfly Whisperer",
      preview: "Kate attracts butterflies, birds, and all creatures great and small...",
      full: "Animals are naturally drawn to Kate's gentle energy. Butterflies land on her shoulders, birds sing when she's around, and even grumpy cats become purring puddles of love. She's basically a real-life Disney princess!"
    },
    {
      title: "🌸 Seasonal Mood Matcher",
      preview: "Kate changes with the seasons, always perfectly in tune...",
      full: "Kate has this amazing ability to match the energy of every season. In spring, she's full of new ideas and fresh energy. Summer brings out her adventurous side. Fall makes her cozy and thoughtful. Winter finds her creating warmth for everyone around her."
    },
    {
      title: "🌿 Natural Healer",
      preview: "Kate's presence is like a healing balm for the soul...",
      full: "Kate has this natural healing energy that makes everyone feel better just by being around her. Bad day? Kate's got the perfect remedy. Stressed out? Her calm presence is like a gentle breeze. She's nature's own therapy session!"
    },
    {
      title: "🏔️ Mountain Mover",
      preview: "Kate can move mountains... of laundry, problems, and hearts...",
      full: "When Kate sets her mind to something, nothing can stop her. She approaches challenges like a gentle but persistent river - she'll find a way around, over, or through any obstacle. Her determination is as steady as the earth itself!"
    },
    {
      title: "🌊 Ocean of Wisdom",
      preview: "Kate's advice flows like a peaceful stream...",
      full: "Kate has this deep well of wisdom that seems to come from being so connected to the natural world. Her advice is always thoughtful, her perspective always refreshing, and her insights as clear as mountain spring water. She's like having your own personal sage!"
    }
  ];

  const regularFacts = [
    {
      title: "🎯 Superpower Alert!",
      preview: "Kate can make anyone laugh within 30 seconds...",
      full: "Kate has the incredible ability to make anyone laugh within 30 seconds of meeting them. Scientists are still trying to figure out how she does it, but we suspect it involves a combination of perfect timing, infectious energy, and maybe a little bit of magic!"
    },
    {
      title: "🍕 Food Connoisseur",
      preview: "Pizza is not just food, it's a love language...",
      full: "For Kate, pizza isn't just food - it's a love language, a form of art, and probably a religion. She can identify 47 different pizza styles by smell alone and has strong opinions about pineapple (which she'll defend with passion)!"
    },
    {
      title: "🎵 Dance Floor Dominator",
      preview: "Warning: Kate's dance moves are certified dangerous...",
      full: "Kate's dance moves are so good they come with a warning label. She once accidentally started a flash mob at a grocery store just by humming and doing a little shoulder shimmy in the cereal aisle. The security footage went viral!"
    },
    {
      title: "🌟 Professional Problem Solver",
      preview: "Got a problem? Kate's got seventeen solutions...",
      full: "Kate has this amazing talent for solving problems that haven't even happened yet. Friends regularly call her the 'Future Fixer' because she somehow always knows exactly what you need before you know you need it!"
    },
    {
      title: "🎪 Master of Fun",
      preview: "Kate can turn any boring situation into an adventure...",
      full: "Waiting in line? Kate turns it into a game. Stuck in traffic? Suddenly it's karaoke time. Boring meeting? Kate somehow makes it interesting without getting anyone in trouble. It's like she has a PhD in Fun!"
    },
    {
      title: "💖 Heart of Gold",
      preview: "Kate's kindness level is off the charts...",
      full: "Kate's kindness meter broke the scale years ago. She remembers everyone's birthday, always has the perfect thing to say when you're down, and somehow makes everyone feel like they're her best friend. It's not fair how wonderful she is!"
    }
  ];

  const funFacts = isStarWars ? starWarsFacts : isBarbie ? barbieFacts : isNature ? natureFacts : regularFacts;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold text-center ${theme.text} mb-12`}>
          {isStarWars ? 
            "Kate Morales: Jedi Master, Rebel Hero, Legend of the Galaxy! ⭐" : 
            isBarbie ?
            "About Kate: Living Her Best Life in Plastic Fantastic Style! 💖" :
            isNature ?
            "About Kate: A Natural Wonder in Human Form! 🌿" :
            "About Kate: The Legend, The Myth, The Amazing Human! ✨"
          }
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {funFacts.map((fact, index) => (
            <div 
              key={index}
              className={`${theme.card} rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer animate-fadeInUp`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setExpandedFact(expandedFact === index ? null : index)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${theme.textDark}`}>
                  {fact.title}
                </h3>
                {expandedFact === index ? 
                  <ChevronUp className={theme.textDark} /> : 
                  <ChevronDown className={theme.textDark} />
                }
              </div>
              
              <div className={`${theme.textDark} transition-all duration-500`}>
                {expandedFact === index ? (
                  <p className="text-base leading-relaxed animate-fadeIn">
                    {fact.full}
                  </p>
                ) : (
                  <p className="text-sm opacity-75">
                    {fact.preview}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Special Message */}
        <div className={`${theme.card} rounded-3xl p-8 mt-12 text-center shadow-2xl`}>
          <h3 className={`text-2xl font-bold ${theme.textDark} mb-4`}>
            {isStarWars ? "The Force is Strong with Kate 💫" : 
             isBarbie ? "Kate: More Than Just a Pretty Face 💕" : 
             isNature ? "Kate: A Force of Nature 🌺" :
             "The Real Truth About Kate 💝"}
          </h3>
          <p className={`text-lg ${theme.textDark} leading-relaxed`}>
            {isStarWars ? (
              <>
                In a galaxy full of ordinary people, Kate shines brighter than a twin sunset on Tatooine. 
                She brings hope to the hopeless, laughter to the serious, and has this incredible power to make 
                everyone around her feel like they're part of something special. May the Force be with us all, 
                but especially with Kate - because she's already mastered it! 🌟
              </>
            ) : isBarbie ? (
              <>
                Just like Barbie showed us that we can be anything, Kate proves it every single day! 
                She's not just living in a dream world - she's creating one for everyone around her. 
                With her pink-sized heart and platinum-level kindness, Kate makes life feel like 
                a never-ending adventure in the best possible way. Life's a party when Kate's around! 💖
              </>
            ) : isNature ? (
              <>
                Like the most beautiful garden, Kate is a perfect blend of strength and gentleness, 
                growth and stability, beauty and purpose. She has this incredible way of helping 
                everyone around her bloom into their best selves. In a world that can sometimes feel 
                artificial, Kate is refreshingly authentic - a breath of fresh air and a ray of 
                sunshine all rolled into one amazing person! 🌻
              </>
            ) : (
              <>
                Behind all the jokes and fun facts, Kate is genuinely one of the most incredible people you'll ever meet. 
                She brings light wherever she goes, makes everyone feel valued, and has this magical way of making 
                the world a better place just by being in it. We're all lucky to know her! 
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;