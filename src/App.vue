<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const menuOpen = ref(false)
const activeFaq = ref(0)
const testimonial = ref(0)
const submitted = ref(false)

const whatsapp = 'https://wa.me/551123913727'

const services = [
  ['../icons/icon-layers.png', 'Financiamento de veículos', 'Avaliação das condições do contrato de financiamento e das circunstâncias do caso.'],
  ['../icons/icon-calendar.png', 'Defesa em busca e apreensão', 'Orientação e atuação em situações envolvendo busca e apreensão de veículos, considerando os documentos e circunstâncias de cada caso.'],
  ['../icons/icon-home.png', 'Contratos quitados', 'A quitação do contrato não impede que determinadas questões possam ser analisadas.'],
  ['../icons/icon-focus.png', 'Defesa em penhora', 'Orientação em situações envolvendo penhora de bens e medidas relacionadas à execução, de acordo com as características de cada processo.'],
  ['../icons/icon-home.png', 'Imóveis', 'Financiamentos, contratos bancários e consórcios relacionados à aquisição de imóveis.'],
  ['../icons/icon-layers.png', 'Contratos bancários', 'Análise de contratos e obrigações relacionadas à instituição financeira.'],
  ['../icons/icon-calendar.png', 'Consórcios de veículos', 'Orientação em situações envolvendo contratos de consórcio e suas condições.'],
  ['../icons/icon-focus.png', 'Regularização de CNH', 'Orientação para suspensão, cassação, bloqueio, bafômetro, multas na CNH provisória e outras questões do direito de dirigir.']
]

const cases = [
  ['“Ainda estou pagando.”', 'Podemos analisar as condições do financiamento e verificar as questões jurídicas aplicáveis ao caso.'],
  ['“Já quitei meu veículo.”', 'Mesmo após a quitação, determinadas questões contratuais podem ser analisadas conforme o caso concreto.'],
  ['“Estou preocupado com a busca e apreensão.”', 'Se existe uma situação envolvendo busca e apreensão, é importante buscar orientação quanto antes.']
]

const testimonials = [
  ['../testimonials/cliente-eric-matias.jpg', 'Eric Matias', 'Fui muito bem orientado desde o primeiro contato. Explicaram minha situação com clareza e me ajudaram a entender quais eram minhas opções.'],
  ['../testimonials/cliente-maria-ribeiro.jpg', 'Maria Ribeiro', 'Meu caso foi analisado com bastante atenção. O atendimento foi profissional, transparente e consegui entender melhor todos os próximos passos.'],
  ['../testimonials/cliente-paule-paluff.jpg', 'Paule Paluff', 'Gostei muito do atendimento. Tive minhas dúvidas esclarecidas e recebi uma orientação clara sobre a situação do meu financiamento.'],
  ['../testimonials/cliente-ariana-silva-site-reuse.jpg', 'Ariana Silva', 'O atendimento foi excelente e muito esclarecedor. Todas as minhas dúvidas foram respondidas de forma simples, objetiva e profissional.']
]

const faqs = [
  ['01 — Você entra em contato', 'Explique brevemente o que aconteceu e informe qual é a sua situação.'],
  ['02 — Seus documentos são analisados', 'As informações e documentos necessários são avaliados conforme o caso.'],
  ['03 — Você recebe orientação', 'São apresentadas as possibilidades e medidas que podem ser aplicáveis à sua situação.'],
  ['04 — Definição dos próximos passos', 'Caso exista uma medida adequada, você recebe orientação sobre como prosseguir.']
]

const heroPhrases = ['Análise individualizada', 'Atendimento profissional']
const bannerPhrases = ['Solicite uma análise', 'Atendimento Personalizado']

function createTypewriter(phrases, { typing = 72, deleting = 38, hold = 1900, gap = 380 } = {}) {
  const text = ref(phrases[0])
  let phraseIndex = 0
  let characterIndex = phrases[0].length
  let isDeleting = true
  let timeout

  const tick = () => {
    const phrase = phrases[phraseIndex]

    if (isDeleting) {
      if (characterIndex > 0) {
        characterIndex -= 1
        text.value = phrase.slice(0, characterIndex)
        timeout = setTimeout(tick, deleting)
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length
        isDeleting = false
        timeout = setTimeout(tick, gap)
      }
      return
    }

    const nextPhrase = phrases[phraseIndex]
    if (characterIndex < nextPhrase.length) {
      characterIndex += 1
      text.value = nextPhrase.slice(0, characterIndex)
      timeout = setTimeout(tick, typing)
    } else {
      isDeleting = true
      timeout = setTimeout(tick, hold)
    }
  }

  return {
    text,
    start() {
      timeout = setTimeout(tick, hold)
    },
    stop() { clearTimeout(timeout) }
  }
}

const {
  text: heroTypedText,
  start: startHeroTypewriter,
  stop: stopHeroTypewriter
} = createTypewriter(heroPhrases)
const {
  text: bannerTypedText,
  start: startBannerTypewriter,
  stop: stopBannerTypewriter
} = createTypewriter(bannerPhrases)
let testimonialTimer
onMounted(() => {
  testimonialTimer = setInterval(() => testimonial.value = (testimonial.value + 1) % testimonials.length, 5500)
  startHeroTypewriter()
  startBannerTypewriter()
})
onBeforeUnmount(() => {
  clearInterval(testimonialTimer)
  stopHeroTypewriter()
  stopBannerTypewriter()
})

function scrollTo(id) {
  menuOpen.value = false
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-ink text-white">
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <nav class="container-shell flex h-[90px] items-center justify-between" aria-label="Navegação principal">
        <button class="shrink-0" aria-label="Ir ao início" @click="scrollTo('#inicio')"><img src="../logos/logo-header.jpg" alt="Revogue Consultoria" class="h-11 w-auto rounded-sm" /></button>
        <div class="hidden items-center gap-8 text-sm text-white/75 md:flex">
          <button @click="scrollTo('#inicio')">Início</button><button @click="scrollTo('#servicos')">Serviços</button><button @click="scrollTo('#avaliacoes')">Avaliações</button><button @click="scrollTo('#como-funciona')">Como funciona</button>
        </div>
        <a :href="whatsapp" target="_blank" rel="noopener" class="btn-primary hidden md:inline-flex">Fale conosco <span>↗</span></a>
        <button class="grid h-11 w-11 place-items-center rounded-full border border-white/20 md:hidden" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen = !menuOpen"><span class="text-xl">{{ menuOpen ? '×' : '☰' }}</span></button>
      </nav>
      <div v-if="menuOpen" class="border-t border-white/10 bg-ink px-6 py-6 md:hidden"><div class="flex flex-col gap-5 text-left"><button @click="scrollTo('#inicio')">Início</button><button @click="scrollTo('#servicos')">Serviços</button><button @click="scrollTo('#avaliacoes')">Avaliações</button><button @click="scrollTo('#como-funciona')">Como funciona</button><a :href="whatsapp" class="text-lime">Fale conosco ↗</a></div></div>
    </header>

    <main>
      <section id="inicio" class="hero-bg relative flex min-h-[680px] items-center pt-[120px] pb-16 sm:min-h-[760px] sm:pt-[150px]">
        <div class="absolute inset-0 bg-ink/25"></div>
        <div class="container-shell relative z-10 text-center">
          <p class="mx-auto mb-6 max-w-3xl text-[15px] font-medium uppercase leading-snug text-white sm:text-xl">Revogue Consultoria<br />Seu financiamento de veículo pode ser analisado.</p>
          <h1 class="mx-auto flex max-w-4xl flex-col font-display text-[35px] font-normal leading-[1.2] tracking-[-.035em] text-white sm:text-5xl lg:text-[56px]">
            <span>Financiamento</span>
            <span>Contrato bancário</span>
            <span>Consórcio</span>
            <span>Regularização de CNH</span>
            <span class="sr-only">Análise individualizada e atendimento profissional</span>
            <span class="hero-phrase mt-5 text-[.88em] text-lime sm:text-[1.15em] lg:text-[1.35em]" aria-hidden="true">
              <span>{{ heroTypedText }}</span><span class="typing-caret"></span>
            </span>
          </h1>
          <p class="mx-auto mt-10 max-w-5xl text-sm leading-7 text-white sm:text-lg">Entenda seus direitos e verifique se existem questões contratuais que podem ser discutidas no seu caso.</p>
          <a :href="whatsapp" target="_blank" rel="noopener" class="btn-outline mt-8">Quero analisar meu caso</a>
        </div>
      </section>

      <section class="portrait-stage">
        <div class="container-shell py-14 sm:py-16">
          <div class="portrait-frame">
            <img src="../hero/advogado-hero-01.jpg" alt="Consultor da Revogue em ambiente profissional" />
            <div class="portrait-overlay"></div>
          </div>
        </div>
      </section>

      <section class="analysis-cta" aria-labelledby="analysis-cta-title">
        <div class="container-shell relative z-10 flex min-h-[430px] flex-col items-center justify-center text-center">
          <h2 id="analysis-cta-title" class="analysis-cta-title">Pagando um financiamento e<br class="hidden sm:block" /> tem dúvidas sobre o contrato?</h2>
          <div class="banner-phrase mt-4 text-lime">
            <span class="sr-only">Solicite uma análise. Atendimento personalizado.</span>
            <span aria-hidden="true">{{ bannerTypedText }}</span><span class="typing-caret" aria-hidden="true"></span>
          </div>
          <a :href="whatsapp" target="_blank" rel="noopener" class="btn-outline mt-16">Enviar mensagem <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section id="servicos" class="section-pad"><div class="container-shell"><div class="max-w-4xl"><p class="eyebrow">Áreas de atuação</p><h2 class="section-title">Análise de financiamentos, contratos bancários e <span>consórcios</span></h2><p class="section-copy">Uma análise individual para entender a sua situação. Atuamos na análise e orientação de casos envolvendo:</p></div><div class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"><article v-for="(service, i) in services" :key="service[1]" class="group bg-ink p-7 transition hover:bg-[#121a15]"><img :src="service[0]" alt="" class="h-11 w-11 object-contain opacity-90" /><p class="mt-8 text-xs text-lime">0{{ i + 1 }}</p><h3 class="mt-3 font-display text-xl">{{ service[1] }}</h3><p class="mt-4 text-sm leading-6 text-white/55">{{ service[2] }}</p></article></div><div class="mt-10 text-center"><a :href="whatsapp" class="btn-outline">WhatsApp agora <span>↗</span></a></div></div></section>

      <section class="contract-section">
        <div class="contract-shell">
          <div class="contract-copy">
            <a :href="whatsapp" class="btn-outline normal-case">WhatsApp Agora</a>
            <h2>O primeiro passo é<br class="hidden sm:block" /> entender o seu contrato.</h2>
            <article v-for="item in cases" :key="item[0]">
              <h3>{{ item[0] }}</h3>
              <p>{{ item[1] }}</p>
            </article>
          </div>
          <div class="contract-photo">
            <img src="../hero/advogado-hero-02.jpg" alt="Consultor da Revogue" />
          </div>
        </div>
      </section>

      <section id="avaliacoes" class="section-pad"><div class="container-shell"><p class="eyebrow text-center">Fale conosco · Avaliações</p><h2 class="section-title mx-auto max-w-3xl text-center">A experiência de nossos <span>clientes</span></h2><p class="section-copy mx-auto text-center">Confira alguns relatos de pessoas que buscaram a Revogue para entender melhor suas situações.</p><div class="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/10 bg-panel p-7 sm:p-12"><Transition name="fade" mode="out-in"><div :key="testimonial" class="grid items-center gap-8 sm:grid-cols-[150px_1fr]"><img :src="testimonials[testimonial][0]" :alt="testimonials[testimonial][1]" class="aspect-square w-full max-w-[150px] rounded-2xl object-cover" /><div><div class="text-lime">★★★★★</div><blockquote class="mt-5 font-display text-xl leading-relaxed sm:text-2xl">“{{ testimonials[testimonial][2] }}”</blockquote><p class="mt-5 text-sm text-white/55">— {{ testimonials[testimonial][1] }}</p></div></div></Transition><div class="mt-8 flex justify-center gap-2"><button v-for="(_, i) in testimonials" :key="i" :aria-label="`Ver avaliação ${i+1}`" class="h-2 rounded-full transition-all" :class="i === testimonial ? 'w-8 bg-lime' : 'w-2 bg-white/25'" @click="testimonial = i"></button></div></div></div></section>

      <section id="como-funciona" class="bg-soft section-pad"><div class="container-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p class="eyebrow">FAQ · Como funciona</p><h2 class="section-title">Do primeiro contato à análise do seu <span>caso.</span></h2></div><div class="divide-y divide-white/10 border-y border-white/10"><article v-for="(faq, i) in faqs" :key="faq[0]"><button class="flex w-full items-center justify-between py-7 text-left font-display text-lg sm:text-xl" :aria-expanded="activeFaq === i" @click="activeFaq = activeFaq === i ? -1 : i"><span>{{ faq[0] }}</span><span class="text-lime">{{ activeFaq === i ? '−' : '+' }}</span></button><div class="grid transition-all duration-300" :class="activeFaq === i ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'"><p class="overflow-hidden leading-7 text-white/55">{{ faq[1] }}</p></div></article></div></div></section>

      <section class="newsletter-section" aria-labelledby="newsletter-title">
        <div class="container-shell relative z-10 flex min-h-[610px] flex-col items-center justify-center text-center">
          <h2 id="newsletter-title" class="newsletter-title"><span>Receba uma orientação</span><span>inicial sobre o seu caso</span></h2>
          <p class="newsletter-copy">Informe seu e-mail e receba mais informações sobre como funciona a análise de financiamentos, contratos e consórcios.</p>
          <form class="newsletter-form" @submit.prevent="submitted = true">
            <label for="email" class="sr-only">Seu e-mail</label>
            <input id="email" required type="email" inputmode="email" autocomplete="email" placeholder="Digite seu e-mail" aria-describedby="newsletter-feedback" />
            <button type="submit">Enviar</button>
          </form>
          <p id="newsletter-feedback" class="newsletter-feedback" role="status">{{ submitted ? 'Recebemos seu contato. Em breve falaremos com você.' : '' }}</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container-shell relative z-10">
        <div class="footer-intro">
          <h2>Revogue Consultoria</h2>
          <p>Orientação profissional para questões financeiras, contratuais e administrativas.</p>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="../logos/logo-completo.jpg" alt="Revogue Consultoria" />
            <p>Financiamentos • Contratos • Consórcios • Busca e Apreensão • Penhora • Superendividamento • CNH</p>
          </div>
          <nav class="footer-nav" aria-label="Contato">
            <h3>Contato</h3>
            <a :href="whatsapp" target="_blank" rel="noopener">About Us</a>
            <a :href="whatsapp" target="_blank" rel="noopener">Mission &amp; Vision</a>
          </nav>
          <nav class="footer-nav" aria-label="Termos e condições">
            <h3>Termos &amp;<br /> condições</h3>
            <button @click="scrollTo('#como-funciona')">Help Center</button>
            <button @click="scrollTo('#como-funciona')">Documentation</button>
          </nav>
          <nav class="footer-nav" aria-label="Links de navegação">
            <h3>Navigation Links</h3>
            <button @click="scrollTo('#inicio')">Home</button>
            <button @click="scrollTo('#servicos')">Services</button>
          </nav>
        </div>
        <div class="footer-bottom">Revogue Consultoria © 2026. Todos os direitos reservados.</div>
      </div>
    </footer>
    <a :href="whatsapp" target="_blank" rel="noopener" class="whatsapp-float" aria-label="Falar com a Revogue pelo WhatsApp">
      <span class="whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.25 11.63a8.25 8.25 0 0 1-11.92 7.4L3.75 20.5l1.5-4.43a8.25 8.25 0 1 1 15-4.44Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.15 7.9c.2-.45.42-.46.72-.47h.61c.2 0 .4.08.52.39l.76 1.84c.1.25.06.45-.08.64l-.56.72c-.15.18-.17.35-.05.57.64 1.13 1.54 2.04 2.72 2.66.2.11.37.09.53-.1l.76-.9c.18-.22.39-.25.64-.15l1.8.85c.27.13.41.28.36.57-.12.7-.44 1.32-.99 1.78-.56.47-1.3.64-2.03.47-1.42-.34-3.25-1.14-4.82-2.68-1.26-1.24-2.15-2.77-2.54-4.04-.23-.75-.15-1.5.29-2.15Z" fill="currentColor"/>
        </svg>
      </span>
      <span class="whatsapp-copy">
        <strong>Fale no WhatsApp</strong>
        <small>Atendimento online</small>
      </span>
      <span class="whatsapp-arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</template>
