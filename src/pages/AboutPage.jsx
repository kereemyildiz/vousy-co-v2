import { motion } from 'framer-motion'
import { Heart, Target, Award, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Tutkumuz',
      description: 'Edebiyata olan sevgimizi sanatsal posterlerle ifade ediyoruz'
    },
    {
      icon: Target,
      title: 'Misyonumuz',
      description: 'Kitap severler için özel ve kaliteli posterler tasarlamak'
    },
    {
      icon: Award,
      title: 'Kalite',
      description: 'Premium malzemeler ve özenli üretim süreciyle en iyiyi sunuyoruz'
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'Kitap tutkunlarından oluşan büyük bir ailenin parçasıyız'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-5xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-primary-100">
              Edebiyatın başyapıtlarını duvarlarınıza taşıyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vousy, kitap sevgisiyle başlayan bir yolculuğun ürünüdür. Edebiyatın
                büyüsüne kapılmış bir grup tasarımcı ve kitap tutkunu olarak, sevdiğimiz
                eserleri yaşam alanlarımızda da görmek istedik.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Klasiklerden modern edebiyata, her bir posterimiz titizlikle tasarlanıp
                yüksek kaliteli malzemelerle üretiliyor. Amacımız, kitap severlerin
                duvarlarında da edebiyatın izlerini taşımasını sağlamak.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her poster, bir kitabın ruhunu, hikayesini ve estetiğini yansıtacak
                şekilde özgün olarak tasarlanıyor. Siz de sevdiğiniz kitapları
                yaşam alanlarınızda yaşatın.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bizi biz yapan değerler ve ilkeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                      <value.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-gray-600 mb-6">
              Sorularınız, önerileriniz veya özel tasarım talepleriniz için
              bize ulaşabilirsiniz.
            </p>
            <a
              href="mailto:info@vousy.co"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              info@vousy.co
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
