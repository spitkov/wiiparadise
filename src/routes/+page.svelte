<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;

  type Game = {
    name: string;
    url: string;
    icon: string;
    image?: string;
  };

  type Category = 'all' | 'wii' | 'gamecube' | 'tools';
  type GameCategories = Record<Exclude<Category, 'all'>, Game[]>;

  let isDarkMode = false;
  let searchQuery = '';
  let selectedCategory: Category = 'all';

  const games: GameCategories = {
    wii: [
      { 
        name: "Animal Crossing: City Folk", 
        url: "https://pan.huang1111.cn/s/RYMeYhB", 
        icon: "🏠",
        image: "/images/games/wii/animal crossing city folk.jpg"
      },
      { 
        name: "Just Dance 2", 
        url: "https://pan.huang1111.cn/s/1QWZBUv", 
        icon: "💃",
        image: "/images/games/wii/justdance2.jpg"
      },
      { 
        name: "Just Dance 2014", 
        url: "https://pan.huang1111.cn/s/K9VVxSY", 
        icon: "💃",
        image: "/images/games/wii/jd2014.jpg"
      },
      { 
        name: "Just Dance 3", 
        url: "https://pan.huang1111.cn/s/6eEEQSN", 
        icon: "💃",
        image: "/images/games/wii/jd3.jpg"
      },
      { 
        name: "Just Dance Greatest Hits", 
        url: "https://pan.huang1111.cn/s/y5BKqU6", 
        icon: "💃",
        image: "/images/games/wii/jd greatest hits.jpg"
      },
      { 
        name: "Mario Kart Wii", 
        url: "https://pan.huang1111.cn/s/Xq99Oil", 
        icon: "🏎️",
        image: "/images/games/wii/mario katr wii.jpg"
      },
      { 
        name: "New Super Mario Bros Wii", 
        url: "https://pan.huang1111.cn/s/5XN4wIl", 
        icon: "🍄",
        image: "/images/games/wii/nsmbWii.jpg"
      },
      { 
        name: "New Super Mario Bros Wii 2: The Next Levels", 
        url: "https://pan.huang1111.cn/s/VL33bId", 
        icon: "🍄",
        image: "/images/games/wii/newer super mario bros wii.jpg"
      },
      { 
        name: "Super Smash Bros Brawl", 
        url: "https://pan.huang1111.cn/s/Zq332UL", 
        icon: "⚔️",
        image: "/images/games/wii/super smash bros brawl.jpg"
      },
      { 
        name: "The Legend of Zelda: Twilight Princess", 
        url: "https://pan.huang1111.cn/s/gg77QcQ", 
        icon: "🗡️",
        image: "/images/games/wii/twilight princess.jpg"
      },
      { 
        name: "Wii Sports Resort", 
        url: "https://pan.huang1111.cn/s/xbyLjIV", 
        icon: "🏖️",
        image: "/images/games/wii/wii sports resorts.jpg"
      },
      { 
        name: "Wii Sports", 
        url: "https://pan.huang1111.cn/s/O8eoGHL", 
        icon: "⛳",
        image: "/images/games/wii/wii sports.jpg"
      },
      { 
        name: "Wii Party", 
        url: "https://pan.huang1111.cn/s/zMxvZcM", 
        icon: "🎲",
        image: "/images/games/wii/wii party.jpg"
      },
      { 
        name: "The Sims 3", 
        url: "https://pan.huang1111.cn/s/we2nxHK", 
        icon: "👥",
        image: "/images/games/wii/the sims 3.jpg"
      }
    ],
    gamecube: [
      { 
        name: "Mario Kart Double Dash", 
        url: "https://pan.huang1111.cn/s/jREXDty", 
        icon: "🏎️",
        image: "/images/games/gamecube/double dash.jpg"
      },
      { 
        name: "Super Mario Sunshine", 
        url: "https://pan.huang1111.cn/s/8QGkDUQ", 
        icon: "🌞",
        image: "/images/games/gamecube/super mario sunshine.jpg"
      },
      { 
        name: "The Legend of Zelda: Twilight Princess", 
        url: "https://pan.huang1111.cn/s/G89nBsW", 
        icon: "🗡️",
        image: "/images/games/gamecube/twilight princess.jpg"
      },
      { 
        name: "Super Smash Bros Melee", 
        url: "https://pan.huang1111.cn/s/5XN9Mcl", 
        icon: "⚔️",
        image: "/images/games/gamecube/mele.jpg"
      }
            { 
        name: "Need for Speed Carbon", 
        url: "https://pan.huang1111.cn/s/3eK8zhm", 
        icon: "🏎️",
        image: "/images/games/gamecube/nfs carbon.png"
      }
            { 
        name: "Need for Speed Most Wanted", 
        url: "https://pan.huang1111.cn/s/O8aqNcL", 
        icon: "🏎️",
        image: "/images/games/gamecube/nfs most wanted.png"
      }
            { 
        name: "Need for Speed Underground", 
        url: "https://pan.huang1111.cn/s/qgEejI3", 
        icon: "🏎️",
        image: "/images/games/gamecube/nfs underground.png"
      }
            { 
        name: "Need for Speed Underground 2", 
        url: "https://pan.huang1111.cn/s/eNaxaug", 
        icon: "🏎️",
        image: "/images/games/gamecube/nfs underground 2.png"
      }
    ],
    tools: [
      { 
        name: "GameCube Backup Manager", 
        url: "https://pan.huang1111.cn/s/P6ZM3Tm", 
        icon: "💾"
      },
      { 
        name: "Wii Backup Manager", 
        url: "https://pan.huang1111.cn/s/dkAw1CV", 
        icon: "💾"
      }
    ]
  };

  function getCategoryLength(category: Exclude<Category, 'all'>): number {
    return games[category].length;
  }

  $: filteredGames = Object.entries(games).flatMap(([category, items]) => 
    items.filter(game => 
      (selectedCategory === 'all' || selectedCategory === category) &&
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  onMount(() => {
    if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  });
</script>

<div class="min-h-screen relative overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0 bg-gradient animate-gradient"></div>
  
  <!-- Content with glass effect -->
  <div class="relative z-10 max-w-4xl mx-auto p-6">
    <header class="text-center mb-12">
      <h1 class="text-6xl font-bold mb-4 text-white drop-shadow-glow animate-title">
        The Wii Paradise
      </h1>
      <p class="text-xl text-white/90 animate-fadeIn">
        Your ultimate destination for Wii and GameCube games
      </p>
      {#if data?.visitorCount}
        <p class="text-lg text-white/80 mt-2 animate-fadeIn">
          Visitors: {data.visitorCount}
        </p>
      {/if}
    </header>

    <div class="mb-8 space-y-6">
      <div class="flex justify-center gap-4 flex-wrap">
        {#each ['all', 'wii', 'gamecube', 'tools'] as category}
          <button
            class="px-6 py-3 rounded-xl backdrop-blur-md transition-all duration-300
                   {selectedCategory === category 
                     ? 'bg-white/20 text-white scale-105 shadow-glow' 
                     : 'bg-white/10 text-white/90 hover:bg-white/15 hover:scale-105 hover:shadow-glow'}"
            on:click={() => selectedCategory = category as Category}
          >
            <span class="font-medium">
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {#if category !== 'all'}
                ({getCategoryLength(category as Exclude<Category, 'all'>)})
              {/if}
            </span>
          </button>
        {/each}
      </div>

      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search games..."
        class="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md
               border border-white/20 text-white placeholder-white/50
               focus:outline-none focus:ring-2 focus:ring-white/30
               transition-all duration-300"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredGames as game}
        <a
          href={game.url}
          target="_blank"
          rel="noreferrer"
          class="group block rounded-xl backdrop-blur-md bg-white/10 border border-white/10
                 hover:bg-white/15 transition-all duration-500 ease-out
                 hover:scale-105 hover:shadow-glow animate-fadeIn"
        >
          <div class="p-4">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-3xl group-hover:scale-125 transition-all duration-300 ease-out">
                {game.icon}
              </span>
              <h3 class="font-semibold text-white group-hover:text-white/90 transition-colors">
                {game.name}
              </h3>
            </div>
            {#if game.image}
              <div class="relative overflow-hidden rounded-lg">
                <img 
                  src={game.image} 
                  alt={game.name}
                  class="w-full h-48 object-cover transition-all duration-700 ease-out
                         group-hover:scale-110 group-hover:rotate-1"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-all duration-500
                            flex items-end justify-center p-4">
                  <span class="text-white font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm
                              transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Click to Download
                  </span>
                </div>
              </div>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(html) {
    font-family: system-ui, -apple-system, sans-serif;
  }

  .bg-gradient {
    background: linear-gradient(
      -45deg,
      rgb(88, 28, 135),
      rgb(67, 56, 202),
      rgb(124, 58, 237),
      rgb(76, 29, 149)
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  .shadow-glow {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
  }

  .drop-shadow-glow {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes titleAnimation {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.animate-gradient) {
    animation: gradient 15s ease infinite;
  }

  :global(.animate-fadeIn) {
    animation: fadeIn 0.8s ease-out forwards;
  }

  :global(.animate-title) {
    animation: titleAnimation 1s ease-out forwards;
  }
</style>
