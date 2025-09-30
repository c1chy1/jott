<template>
  <UPage>
    <UPageBody class="bg-(--color-jm-secondary-white) mt-0 mb-24" prose>
      <UContainer class="max-w-(--container-2xl) flex justify-center">
        <NuxtLink :to="localePath('/')"
                  class="block no-underline mx-auto w-52 sm:w-2/3 xl:w-3/5 sm:mt-6 border-0"
        >
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH"
                 src="logo.svg"/>
        </NuxtLink>
      </UContainer>
      <UContainer class="max-w-(--container-2xl) py-10">
        <h1 class="font-bold">{{ t('imprint') }}</h1>
        <h3 class="font-bold">{{ t('imprintSite.information') }}</h3>
        <p>
          JOTT.MEDIA GmbH<br>
          Bahnhofstraße 33<br>
          31675 Bückeburg
        </p>

        <h3 class="font-bold">{{ t('director') }}</h3>
        <p>
          Jan Jünemann<br>
          Jonathan Schneider
        </p>

        <h3 class="font-bold">{{ t('imprintSite.contact') }}</h3>
        <p>
          Telefon: +49 5722 99790 70<br>
          E-Mail: hallo@jott.media
        </p>

        <h3 class="font-bold">{{ t('imprintSite.register') }}</h3>
        <p>
          {{ t('imprintSite.registerCommercial') }}<br>
          {{ t('imprintSite.registerCourt') }} Stadthagen <br>
          {{ t('imprintSite.registerNumber') }} HRB 201430
        </p>

        <h3 class="font-bold">{{ t('imprintSite.vat') }}</h3>
        <p>
          {{ t('imprintSite.vatNumber') }}<br>
          DE314475093
        </p>

        <h3 class="font-bold"> {{ t('imprintSite.liability') }}</h3>
        <p>
          {{ t('imprintSite.registeredName') }}<br>
          exali GmbH<br>
          Franz-Kobinger-Str. 9<br>
          86157 Augsburg
        </p>
        <p> {{ t('imprintSite.scope') }}</p>

        <h3 class="font-bold"> {{ t('imprintSite.responsible') }}</h3>
        <p>
          Jonathan Schneider<br>
          Bahnhofstraße 33<br>
          31675 Bückeburg
        </p>

        <h3 class="font-bold"> {{ t('imprintSite.dispute') }}</h3>
        <p>
          {{ t('imprintSite.eu') }}
          <a href="https://ec.europa.eu/consumers/odr" style="pointer-events: auto;">
            https://ec.europa.eu/consumers/odr</a><br>
          {{ t('imprintSite.findUs') }}
        </p>
        <p>
          {{ t('imprintSite.disputeResolution') }}
        </p>

        <h3 class="font-bold"> {{ t('imprintSite.liabilityContent') }}</h3>
        <p>
          {{ t('imprintSite.liabilityText') }}
        </p>
        <p>
          {{ t('imprintSite.liabilityObligations') }}
        </p>

        <h3 class="font-bold">{{ t('imprintSite.liabilityLinks') }}</h3>
        <p>
          {{ t('imprintSite.liabilityLinksText') }}
        </p>
        <p>
          {{ t('imprintSite.liabilityLinksRemoval') }}
        </p>

        <h3 class="font-bold">{{ t('imprintSite.copyright') }}</h3>
        <p>
          {{ t('imprintSite.copyrightContent') }}
        </p>
        <p>
          {{ t('imprintSite.informUs') }}
        </p>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
useHead({
  title: 'Impressum - JOTT.MEDIA'
})
const localePath = useLocalePath()

const {t} = useI18n()
</script>