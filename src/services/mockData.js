// Mock data for testing without Supabase

export const mockCategories = [
  {
    id: '1',
    name: 'Klasikler',
    slug: 'klasikler',
    description: 'Edebiyatın klasik eserleri',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Roman',
    slug: 'roman',
    description: 'Modern ve klasik romanlar',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Bilim Kurgu',
    slug: 'bilim-kurgu',
    description: 'Bilim kurgu kitapları',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Felsefe',
    slug: 'felsefe',
    description: 'Felsefe kitapları',
    created_at: new Date().toISOString()
  }
]

export const mockProducts = [
  {
    id: '1',
    name: '1984 - George Orwell',
    slug: '1984-george-orwell',
    description: 'Distopik bir gelecekte totaliter bir rejimin baskısı altında yaşayan Winston Smith\'in hikayesi. Orwell\'ın걸작ı, özgürlük, gerçek ve direniş üzerine güçlü bir anlatı.',
    price: 299.00,
    image_url: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '1',
    category: mockCategories[0],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Suç ve Ceza - Dostoyevski',
    slug: 'suc-ve-ceza-dostoyevski',
    description: 'Raskolnikov\'un iç dünyasına derin bir yolculuk. Suç, vicdan ve kurtuluş üzerine yazılmış en büyük eserlerden biri.',
    price: 349.00,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '1',
    category: mockCategories[0],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Yabancı - Albert Camus',
    slug: 'yabanci-albert-camus',
    description: 'Absürd felsefenin edebiyattaki en güçlü ifadesi. Meursault\'nun hayata ve ölüme karşı kayıtsızlığı üzerine derin bir roman.',
    price: 279.00,
    image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '1',
    category: mockCategories[0],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Dune - Frank Herbert',
    slug: 'dune-frank-herbert',
    description: 'Bilim kurgunun걸작larından biri. Çöl gezegeni Arrakis\'te geçen destansı bir hikaye. Politik entrikalar, din ve ekoloji üzerine derin bir eser.',
    price: 329.00,
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '3',
    category: mockCategories[2],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Kürk Mantolu Madonna - Sabahattin Ali',
    slug: 'kurk-mantolu-madonna',
    description: 'Türk edebiyatının en güzel aşk hikayelerinden biri. Raif ile Maria\'nın acıklı hikayesi, aşkın ve yalnızlığın evrensel dili.',
    price: 289.00,
    image_url: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '2',
    category: mockCategories[1],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Simyacı - Paulo Coelho',
    slug: 'simyaci-paulo-coelho',
    description: 'Çoban Santiago\'nun hazinesini ararken kendini bulduğu büyülü bir yolculuk. Hayaller, cesaret ve kişisel efsane üzerine ilham verici bir eser.',
    price: 269.00,
    image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '2',
    category: mockCategories[1],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Çavdar Tarlasında Çocuklar - J.D. Salinger',
    slug: 'cavdar-tarlasinda-cocuklar',
    description: 'Holden Caulfield\'ın New York\'taki üç günlük serüveni. Gençlik, yabancılaşma ve masumiyet üzerine zamansız bir roman.',
    price: 295.00,
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '1',
    category: mockCategories[0],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Veba - Albert Camus',
    slug: 'veba-albert-camus',
    description: 'Oran şehrini kasıp kavuran veba salgını üzerine güçlü bir alegorik roman. İnsanlık, dayanışma ve direnç üzerine derin bir meditasyon.',
    price: 315.00,
    image_url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=1200&fit=crop',
    shopier_url: 'https://shopier.com/example',
    category_id: '1',
    category: mockCategories[0],
    specifications: {
      size: '50x70 cm',
      paper: '300gsm Mat Kağıt',
      frame: 'Çerçevesiz'
    },
    created_at: new Date().toISOString()
  }
]

export const mockBlogPosts = [
  {
    id: '1',
    title: '1984: Distopyanın Zamansız걸작ı',
    slug: '1984-distopyanin-zamansiz-걸작i',
    content: `
      <p class="mb-4">George Orwell'ın 1949'da yayınlanan걸작ı "1984", distopik edebiyatın en etkili örneklerinden biri olarak edebiyat tarihindeki yerini koruyor. Totaliter bir rejimin baskısı altında yaşayan Winston Smith'in hikayesi, özgürlük, gerçek ve direniş üzerine güçlü bir anlatı sunuyor.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Büyük Birader'in Gözü</h2>
      <p class="mb-4">Romanın en ikonik unsurlarından biri olan "Büyük Birader Seni İzliyor" sloganı, günümüzde hala dijital gözetim tartışmalarında referans gösteriliyor. Orwell'ın yarattığı bu distopik dünya, teknolojinin kötüye kullanımı ve bireysel özgürlüklerin erozyonu konusunda çarpıcı bir uyarı niteliğinde.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Dil ve Düşünce Kontrolü</h2>
      <p class="mb-4">Yenidil (Newspeak) konsepti, dilin düşünceyi nasıl şekillendirdiğini ve kontrol ettiğini gösteriyor. Orwell, kelimeleri ortadan kaldırarak düşüncelerin de ortadan kaldırılabileceği fikrini işliyor.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Günümüze Mesajı</h2>
      <p class="mb-4">Kitap yayınlandığı günden bu yana geçen onlarca yıla rağmen, güncelliğini hiç kaybetmedi. Sosyal medya, veri madenciliği ve gözetim kapitalizmi çağında, Orwell'ın uyarıları her zamankinden daha anlamlı.</p>

      <p class="mt-6 p-4 bg-gray-100 rounded-lg">Bu걸작ı duvarınızda da yaşatmak isterseniz, özel tasarım 1984 posterimize göz atabilirsiniz.</p>
    `,
    excerpt: 'George Orwell\'ın걸작ı 1984, totaliter rejimler ve bireysel özgürlük üzerine zamansız bir uyarı niteliğinde. Günümüzde hala güncel olan bu eserin derinlemesine incelemesi.',
    cover_image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=1200&h=600&fit=crop',
    category: 'Klasikler',
    read_time: 8,
    related_product_id: '1',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Dostoyevski\'nin Suç ve Ceza\'sında Vicdan Muhasebesi',
    slug: 'dostoyevski-suc-ve-ceza-vicdan',
    content: `
      <p class="mb-4">Fyodor Dostoyevski'nin "Suç ve Ceza" romanı, suç işleyen bir insanın iç dünyasına yapılan en derin yolculuklardan biri. Raskolnikov'un hikayesi, ahlak, vicdan ve kurtuluş üzerine evrensel sorular soruyor.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Psikolojik Derinlik</h2>
      <p class="mb-4">Dostoyevski, Raskolnikov'un zihin dünyasını öyle ustaca anlatıyor ki, okuyucu kendini karakterin düşünceleri içinde buluyor. Suçtan sonraki vicdani hesaplaşma, edebiyat tarihinin en etkileyici psikolojik anlatımlarından biri.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Ahlaki İkilemler</h2>
      <p class="mb-4">Roman, "amaç araçları meşru kılar mı?" sorusunu derinlemesine işliyor. Raskolnikov'un "sıra dışı insan" teorisi ve bunun çöküşü, ahlaki mutlaklık üzerine güçlü bir tartışma sunuyor.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Kurtuluş ve Bağışlanma</h2>
      <p class="mb-4">Sonya karakteri üzerinden işlenen kurtuluş teması, romanın en güçlü yanlarından biri. Sevgi, merhamet ve bağışlamanın gücü, eserin ana temalarını oluşturuyor.</p>
    `,
    excerpt: 'Dostoyevski\'nin걸작ı Suç ve Ceza, vicdan, ahlak ve kurtuluş üzerine derin bir psikolojik roman. Raskolnikov\'un iç dünyasına yolculuk.',
    cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=600&fit=crop',
    category: 'Klasikler',
    read_time: 10,
    related_product_id: '2',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Evinizdeki Kitap Koleksiyonunu Nasıl Sergileyebilirsiniz?',
    slug: 'ev-kitap-koleksiyonu-sergileme',
    content: `
      <p class="mb-4">Kitap severlerin evlerinde en önemli dekorasyon unsurlarından biri, kuşkusuz kitap koleksiyonlarıdır. Peki bu değerli koleksiyonu nasıl daha estetik bir şekilde sergileyebilirsiniz?</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Kitap Rafları</h2>
      <p class="mb-4">Klasik ama etkili: İyi tasarlanmış kitaplıklar hem fonksiyonel hem de dekoratif. Ahşap raflar, modern metal tasarımlar veya minimalist duvar rafları arasından seçim yapabilirsiniz.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Kitap Posterler</h2>
      <p class="mb-4">Sevdiğiniz kitapların posterlerini duvarlarınızda sergilemek, hem dekoratif hem de kişisel bir dokunuş. Klasik eserlerden modern romanlara kadar geniş bir yelpazede poster seçenekleri mevcut.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Okuma Köşesi Oluşturma</h2>
      <p class="mb-4">Rahat bir koltuk, iyi aydınlatma ve çevresinde kitaplarınız... Mükemmel bir okuma köşesi için bunlardan fazlası gerekmiyor. Kitaplarınızı hem saklayabileceğiniz hem de sergileyebileceğiniz bir alan yaratın.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Tematik Düzenleme</h2>
      <p class="mb-4">Kitaplarınızı renklerine, türlerine veya yazarlarına göre düzenlemek, görsel olarak çekici bir etki yaratır. Aynı zamanda aradığınız kitabı bulmanızı da kolaylaştırır.</p>
    `,
    excerpt: 'Kitap koleksiyonunuzu evde nasıl estetik bir şekilde sergileyebileceğinize dair pratik öneriler ve dekorasyon fikirleri.',
    cover_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=600&fit=crop',
    category: 'Dekorasyon',
    read_time: 5,
    related_product_id: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Bilim Kurgu Edebiyatının En Etkili Eserleri',
    slug: 'bilim-kurgu-edebiyati-en-etkili-eserler',
    content: `
      <p class="mb-4">Bilim kurgu, hayal gücünün ve bilimin kesiştiği noktada ortaya çıkan muhteşem bir edebiyat türü. İşte bu türün en etkili ve unutulmaz eserlerinden bazıları.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Dune - Frank Herbert</h2>
      <p class="mb-4">Çöl gezegeni Arrakis'te geçen bu destansı hikaye, bilim kurgunun걸작larından biri. Politik entrikalar, din, ekoloji ve iktidar üzerine derin bir anlatı.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Foundation - Isaac Asimov</h2>
      <p class="mb-4">Galaktik imparatorluğun çöküşünü ve yeniden inşasını anlatan bu epik seri, "psiko-tarih" gibi çığır açan kavramlar getirdi.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Neuromancer - William Gibson</h2>
      <p class="mb-4">Cyberpunk türünün temellerini atan bu roman, dijital dünya ve siber uzay kavramlarını edebiyata taşıdı.</p>

      <h2 class="text-2xl font-bold mt-6 mb-4">Solaris - Stanisław Lem</h2>
      <p class="mb-4">Bilim kurguyu felsefi derinliklerle harmanlayan bu걸작, bilinmeyenle karşılaşma ve iletişim üzerine derin sorular soruyor.</p>
    `,
    excerpt: 'Bilim kurgu edebiyatının en etkili ve unutulmaz eserlerinin incelemesi. Dune\'dan Foundation\'a klasik bilim kurgu romanları.',
    cover_image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop',
    category: 'Bilim Kurgu',
    read_time: 7,
    related_product_id: '4',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
]
