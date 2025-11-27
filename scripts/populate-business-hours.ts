import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as csv from 'csv-parse/sync'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function populateBusinessHours() {
  console.log('Reading CSV file...')

  const csvPath = '/Users/tsukasa.okimori/all_japan_clinics_fixed_20251104_181439.csv'
  const fileContent = fs.readFileSync(csvPath, 'utf-8')

  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })

  console.log(`Found ${records.length} records in CSV`)

  let updated = 0
  let notFound = 0
  let errors = 0

  for (const record of records) {
    const clinicName = record['クリニック名']
    const businessHours = record['営業時間']
    const prefecture = record['都道府県']

    if (!clinicName || !businessHours) {
      continue
    }

    try {
      // Find clinic by name and prefecture
      const { data: clinics, error: fetchError } = await supabase
        .from('clinics')
        .select('id')
        .eq('clinic_name', clinicName)
        .eq('prefecture', prefecture)
        .limit(1)

      if (fetchError) {
        console.error(`Error fetching clinic ${clinicName}:`, fetchError.message)
        errors++
        continue
      }

      if (!clinics || clinics.length === 0) {
        notFound++
        continue
      }

      // Update business_hours
      const { error: updateError } = await supabase
        .from('clinics')
        .update({ business_hours: businessHours })
        .eq('id', clinics[0].id)

      if (updateError) {
        console.error(`Error updating clinic ${clinicName}:`, updateError.message)
        errors++
        continue
      }

      updated++
      if (updated % 100 === 0) {
        console.log(`Updated ${updated} clinics...`)
      }
    } catch (error) {
      console.error(`Unexpected error for clinic ${clinicName}:`, error)
      errors++
    }
  }

  console.log('\n=== Summary ===')
  console.log(`Total records: ${records.length}`)
  console.log(`Updated: ${updated}`)
  console.log(`Not found: ${notFound}`)
  console.log(`Errors: ${errors}`)
}

populateBusinessHours().catch(console.error)
