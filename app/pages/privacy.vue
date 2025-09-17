<template>
  <UPage>
    <UPageBody class="bg-(--color-jm-secondary-white) mt-0" prose>
      <UContainer class="max-w-(--container-2xl) flex justify-center pt-8">
        <NuxtLink :to="localePath('/')" class="inline-block no-underline border-0">
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-[325px]" src="logo.svg"/>
        </NuxtLink>
      </UContainer>
      <UContainer class="max-w-(--container-2xl) py-10">
        <h1 class="font-bold">{{ t('privacySite.title') }} </h1>
        <p>
          {{ t('privacySite.intro') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.responsible') }}</h3>
        <p>
          <span>JOTT.MEDIA GmbH<br>
            Bahnhofstraße 33<br>
            31675 Bückeburg<br>
            E-Mail: hallo@jott.media<br>
            {{ t('director') }} Jan Jünemann, Jonathan Schneider<br>
             {{ t('imprint') }}: https://jott.media/imprint</span>
        </p>
        <h3 class="font-bold"> {{ t('privacySite.dataTypes') }}</h3>
        <p>
          - {{ t('privacySite.dataTypesList.inventoryData') }}<br>
          - {{ t('privacySite.dataTypesList.contactData') }}<br>
          - {{ t('privacySite.dataTypesList.contentData') }}<br>
          - {{ t('privacySite.dataTypesList.usageData') }}<br>
          - {{ t('privacySite.dataTypesList.metaData') }}<br>
        </p>
        <h3 class="font-bold">{{ t('privacySite.processingPurpose') }}</h3>
        <p>
          - {{ t('privacySite.processingPurposeList.provision') }}<br>
          - {{ t('privacySite.processingPurposeList.contact') }}<br>
          - {{ t('privacySite.processingPurposeList.security') }}<br>
          - {{ t('privacySite.processingPurposeList.reach') }}<br>
        </p>

        <h3 class="font-bold">{{ t('privacySite.definitions') }}</h3>
        <p>
          {{ t('privacySite.definitionsText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.legalBasis') }}</h3>
        <p>
          {{ t('privacySite.legalBasisText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.securityMeasures') }}</h3>
        <p>
          {{ t('privacySite.securityMeasuresText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.collaboration') }}</h3>
        <p>
          {{ t('privacySite.collaborationText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.thirdCountryTransfers') }}</h3>
        <p>
          {{ t('privacySite.thirdCountryTransfersText') }}
        </p>
        <h3 class="font-bold"> {{ t('privacySite.dataSubjectRights') }}</h3>
        <p>
          {{ t('privacySite.dataSubjectRightsText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.withdrawalRight') }}</h3>
        <p>
          {{ t('privacySite.withdrawalRightText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.objectionRight') }}</h3>
        <p>
          {{ t('privacySite.objectionRightText') }}
        </p>
        <h3 class="font-bold"> {{ t('privacySite.cookies') }}</h3>
        <p>
          {{ t('privacySite.cookiesText') }}
        </p>
        <h3 class="font-bold">{{ t('privacySite.dataDeletion') }}</h3>
        <p>
          {{ t('privacySite.dataDeletionText') }}
        </p>
        <h3 class="font-bold"> {{ t('privacySite.businessProcessing.related') }}</h3>
        <p>
          <span>{{ t('privacySite.businessProcessing.process') }}<br>
            - {{ t('privacySite.businessProcessing.contract') }}<br>
            - {{ t('privacySite.businessProcessing.paymentData') }}<br>
            {{ t('privacySite.businessProcessing.clients') }}</span>
        </p>
        <h3 class="font-bold">Hosting</h3>
        <p>
          <span>{{ t('privacySite.hosting') }}</span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.accessData') }}</h3>
        <p>
          <span>{{ t('privacySite.accessDataText') }}</span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.agencyServices') }}</h3>
        <p>
          <span>{{ t('privacySite.agencyServicesText') }}</span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.contractualServices') }}</h3>
        <p>
          <span>{{ t('privacySite.contractualServicesText') }}</span>
        </p>
        <h3>
          {{ t('privacySite.administration') }}
        </h3>
        <p>
          <span>   {{ t('privacySite.administrationText') }}
          </span>
        </p>
        <h3> {{ t('privacySite.applicationProcess') }}</h3>
        <p>
          <span>{{ t('privacySite.applicationProcessText') }}
          </span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.contact') }}</h3>
        <p>
          <span>{{ t('privacySite.contactText') }}</span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.socialMedia') }}</h3>
        <p>
          <span>{{ t('privacySite.socialMediaText') }}</span>
        </p>
        <h3 class="font-bold">{{ t('privacySite.thirdPartyServices') }}</h3>
        <p>
          <span>{{ t('privacySite.thirdPartyServicesText') }}</span>
        </p>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
useHead({
  title: 'Datenschutz - JOTT.MEDIA'
})
const localePath = useLocalePath()

const {t} = useI18n()
</script>