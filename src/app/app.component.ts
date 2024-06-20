import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalService } from './local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private countCurrencies;
  private currencyIndex = 0;
  private exchanges = [
    { type: '$', rate: 1 },
    { type: '₽', rate: 90 },
    { type: 'Br', rate: 3 },
    { type: '€', rate: 1.1 },
    { type: '¥', rate: 6.9 },
  ];
  public productsData: any; //= [
  //   {
  //     image: '1.png',
  //     title: 'Лучшие друзья',
  //     text: 'Печенье, с которого все началось! Наше фирменное печенье с шоколадной крошкой и грецкими орехами хрустящее снаружи с достаточно толстой и липкой серединкой.',
  //     price: 20,
  //     basePrice: 20,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '2.png',
  //     title: 'Шоколадный француз',
  //     text: 'Это печенье, изготовленное из тёмного французского какао и полусладкой шоколадной стружки, наверняка удовлетворит даже самого заядлого любителя шоколада.',
  //     price: 24,
  //     basePrice: 24,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '3.png',
  //     title: 'Овсянка с изюмом, Сэр!',
  //     text: 'Это сдобное маслянистое печенье весом шесть унций каждое, золотисто-коричневое снаружи, влажное внутри и наполненное пухлым сладким изюмом.',
  //     price: 18,
  //     basePrice: 18,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '4.png',
  //     title: 'Шоколадное наслаждение',
  //     text: 'Идеально хрустящее снаружи и достаточно густое и липкое в центре, это печенье наполнено полусладкой и тёмной шоколадной стружкой, придающей богатую глубину вкуса.',
  //     price: 24,
  //     basePrice: 24,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '5.png',
  //     title: 'Арахисовый рай',
  //     text: 'Сладкое, пикантное и идеально сбалансированное печенье удовлетворяет тягу любителей арахисового масла и шоколада.',
  //     price: 20,
  //     basePrice: 20,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '6.png',
  //     title: 'Шоколадный ореховый деликатес',
  //     text: 'Наша фирменная рецептура печенья с шоколадными крошками и грецкими орехами гарантирует незабываемый вкусовой опыт. Каждое печенье хрустит снаружи, но раскрывает внутри нежную сердцевину.',
  //     price: 18,
  //     basePrice: 18,
  //     weight: '2&nbsp;шт./ 200&nbsp;гр.',
  //   },
  //   {
  //     image: '7.png',
  //     title: 'Ассорти фирменного печенья',
  //     text: 'Зачем выбирать один, когда можно получить их все? Наш классический ассортимент печенья включает в себя по одному из четырёх оригинальных вкусов печенья.',
  //     price: 36,
  //     basePrice: 36,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  //   {
  //     image: '8.png',
  //     title: 'Лимонное печенье',
  //     text: 'Весна уже не за горами, но нам не терпелось подарить вам немного солнечного света: наше первое лимонное печенье. Это лакомство жевательное, лимонное, не слишком сладкое и даже немного… освежающее?',
  //     price: 33,
  //     basePrice: 33,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  //   {
  //     image: '9.png',
  //     title: 'Любители шоколада',
  //     text: 'Вам больше не нужно выбирать фаворитов. Мы сделали этот набор для всех людей, которые действительно любят шоколад…',
  //     price: 38,
  //     basePrice: 38,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  //   {
  //     image: '10.png',
  //     title: 'Карамель и кокос',
  //     text: 'Побалуйте себя кокосовым, маслянистым, карамельным печеньем, которое обладает невиданным ранее вкусом и текстурой. Наслаждение круглый год.',
  //     price: 33,
  //     basePrice: 33,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  //   {
  //     image: '11.png',
  //     title: 'Веганское с шоколадной крошкой',
  //     text: 'Наше веганское безглютеновое печенье содержит кусочки хрустящих грецких орехов и полусладкую веганскую шоколадную стружку.',
  //     price: 39,
  //     basePrice: 39,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  //   {
  //     image: '12.png',
  //     title: 'Крем-брюле ореховое печенье',
  //     text: 'Используя уникальную смесь ингредиентов, мы создали печенье с кусочками крем-брюле и миндальными орехами, которое обещает неповторимые гастрономические ощущения. Каждый кусочек обладает хрустящей корочкой и тает во рту.',
  //     price: 35,
  //     basePrice: 35,
  //     weight: '4&nbsp;шт./ 400&nbsp;гр.',
  //   },
  // ];

  public form = this.fb.group({
    product: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    private store: LocalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.countCurrencies = this.exchanges.length;

    let savedCurrency = store.getData('currentCurrency');
    if (savedCurrency) {
      this.currencyIndex = +savedCurrency;
    }
  }

  ngOnInit() {
    this.http.get('https://testologia.ru/cookies').subscribe((data) => {
      this.productsData = data;
      this.setPrices();
    });
  }

  private setPrices() {
    this.productsData.forEach((item: any) => {
      item.price = item.basePrice * this.exchanges[this.currencyIndex].rate;
    });
  }

  public scrollTo(target: HTMLElement, product?: any) {
    target.scrollIntoView({ behavior: 'smooth' });

    if (product) {
      this.form.patchValue({
        product: `${product.title} (${product.price} ${this.getCurrency()})`,
      });
    }
  }

  public getCurrency() {
    return this.exchanges[this.currencyIndex].type;
  }

  public changeCurrency() {
    this.currencyIndex = (this.currencyIndex + 1) % this.countCurrencies;
    this.store.saveData('currentCurrency', `${this.currencyIndex}`);

    this.setPrices();
  }

  public confirmOrder() {
    if (this.form.valid) {
      this.http
        .post('https://testologia.ru/cookies-order', this.form.value)
        .subscribe({
          next: (response: any) => {
            alert(response.message);
            this.form.reset();
          },
          error: (response: any) => {
            alert(response.error.message);
          },
        });
    }
  }
}
