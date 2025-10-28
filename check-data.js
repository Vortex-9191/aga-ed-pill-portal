const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
  // Check 羽島市
  const { data: hashimaData, error: hashimaError } = await supabase
    .from('clinics')
    .select('id, name, municipalities, prefecture')
    .eq('prefecture', '岐阜県')
    .eq('municipalities', '羽島市')

  console.log('\n=== 羽島市 in 岐阜県 ===')
  console.log('Count:', hashimaData?.length || 0)
  if (hashimaData) {
    hashimaData.forEach(clinic => {
      console.log(`  - ${clinic.name}`)
    })
  }

  // Check all 岐阜県 municipalities
  const { data: gifuData, error: gifuError } = await supabase
    .from('clinics')
    .select('municipalities, prefecture')
    .eq('prefecture', '岐阜県')
    .not('municipalities', 'is', null)

  console.log('\n=== All municipalities in 岐阜県 ===')
  const municipalityMap = new Map()
  gifuData?.forEach(clinic => {
    const count = municipalityMap.get(clinic.municipalities) || 0
    municipalityMap.set(clinic.municipalities, count + 1)
  })

  const sorted = Array.from(municipalityMap.entries())
    .sort((a, b) => b[1] - a[1])

  sorted.forEach(([name, count]) => {
    console.log(`  ${name}: ${count}件`)
  })
}

checkData()
