## 課題 1

なし

## 課題 2

### functions.tsの単体テスト
DIを用いた実装に修正

https://github.com/axtx4869/praha-challenge-templates/pull/1/commits/2bd058ec16a83f8b6b42a38928cf085d6de10765

テストコードの実装

https://github.com/axtx4869/praha-challenge-templates/pull/1/commits/4c6b78112fb650e0e865d7beeca78eba692752f4

### nameApiService.tsの単体テスト

https://github.com/axtx4869/praha-challenge-templates/pull/1/commits/75df59bce98a926964c5a332daf1368a291103c7

## 課題 3

### カバレッジ 100%のテストが書けなかった理由

元々の関数では関数内部で外部モジュールのインスタンス生成を行なっているため、テスト実行時にモックに差し替えることが難しい(`DatabaseMock`, `NameApiService`)。したがってこれらの返却値をテスト対象の関数を呼び出す際に制御することができないため、カバレッジ 100%のテストが書けない。

### 依存性の注入とは何か

依存性の注入とは、テスト対象のモジュールや関数が依存している何か（他のサービスとの通信、他のインフラストラクチャ etc）との関係を疎結合にし、関心の分離を行うことである。その結果、テストから依存性を排除することができ、安定した結果を得られるテストを実装できるようになる。

### モジュール同士の結合度の強さ

弱くなる。実装の詳細に依存しなくなるため。

### 外部サービスとの通信が発生すると、どのようなデメリットがあるでしょうか？

- テストの実行結果が外部サービスの状態に依存してしまい、安定したテスト結果が得られない可能性がある。

- 外部サービスからレスポンスを受け取るのを待つため、テストの実行時間が長くなる。

- 外部サービスに対してテストデータなどの不要なリソースを作成してしまうかも、外部サービスに対して迷惑

### sumOfArray のリファクタ

https://github.com/axtx4869/praha-challenge-templates/pull/1/commits/b6ad35c645e55785031f178835c85492a6565072

### Property Based Testing

**なぜこのテストの考え方がコード品質を向上してくれる可能性があるのか**

少ない記述量で膨大なテストケースを自動で生成してくれるため、開発者が気づかないようなエッジケースの発見に役立つからから。以下の fizzBuzz のようなケースが分かりやすかった。[fast-check で Property Based Testing を試してみる
](https://zenn.dev/ryo_kawamata/articles/22d4408bd1f138)

**逆に採用しない方が良いケースはあるか？**

不明・・・。

参考：[When to choose Example based testing and property based for Stateful Testing](https://stackoverflow.com/questions/72359149/when-to-choose-example-based-testing-and-property-based-for-stateful-testing)

### 単体テストケースを増やしても可読性、保守性、実行速度などに問題が起きないよう工夫できることを 3 つ

**可読性**

- 過度な DRY を避けて、脳内メモリを消費しないテストコードを書く（テストコード上では変数名をベタ書き）

参考: [リーダブルテストコード
](https://logmi.jp/tech/articles/327449)

※保守性とのトレードオフ

**実行速度**

- テストを同一マシン上でも並列で動作するようにする。(Jest ではデフォルトでテストを実行するとファイルは並列実行、ファイル内のテストケースは逐次実行されます

参考: [Jest テストの並行実行と逐次実行をちゃんと理解する](https://qiita.com/noriaki/items/5d800ea1813c465a0a11))

**保守性**

- 無駄なテストを書かない。[Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)などに則って、書くべきテストだけ書く。

## 課題 4

テストコードを書いていただく関数

https://github.com/axtx4869/praha-challenge-templates/blob/unit-test-with-jest/jestSample/furuno.ts

**Jest に関するクイズ**

Q1.  
`jest.fn()`は以下のように`mockName`メソッドを提供している。
この、mockName メソッドはどのような場面で役立つでしょうか？

```javascript
const myMockFn = jest.fn().mockReturnValue("mockReturnValue").mockName("mockNameです");
```

Q2.  
以下のテストは当然 PASS しません。PASS させるには`expected`にどのような値を代入すればよいでしょうか？

```javascript
describe("hogehoge", () => {
  it("mockImplementationOnceで定義されている個数を上回る場合どうなるかの問題", () => {
    const mockFn = jest
      .fn()
      .mockImplementationOnce(() => "first call")
      .mockImplementationOnce(() => "second call");

    mockFn(); // 'first call'
    mockFn(); // 'second call'
    const actual = mockFn();
    const expected = "???";
    expect(autual).toBe(expected);
  });
});
```

Q3.  
PASS するのはどれでしょうか？　(undefined, null, NaN, 0, '')

```javascript
describe("expect.anything()の評価対象に関しての問題", () => {
  it.each([undefined, null, NaN, 0, ""])("expect.anything()で%pは評価できるか", (arg) => {
    const mockFn = jest.fn((arg: any) => arg);
    mockFn(arg);
    expect(mockFn).toHaveBeenCalledWith(expect.anything());
  });
});
```

## 課題5

[mui/material-ui](https://github.com/mui/material-ui/blob/612db95ec47fdd9e30f9cb33b99df3af5a972542/test/utils/mochaHooks.test.js)

`breforeEach`がArrage, `it`がAct, `afterEach`がAssertionとなっており、各スコープごとにAAAの責務が分割されている。(`afterEach`でcleanupも行っている？かもなので微妙だが、なるほどと思いました)

[styled-components/styled-components](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/hoc/withTheme.spec.tsx)

`cosole.warn`はテストの関心対象では無いので、mockしてあげて何もしないようにしてあげている。
テスト実行時にブラウザのwindowオブジェクト周りの扱いってどうするのかなと思っていたので参考になった

[pmndrs/jotai](https://github.com/pmndrs/jotai/blob/main/tests/core/optimization.test.tsx)

Reactのコンポーネントなどのテストの場合、イベントを発火させた後すぐにassertionメソッドで検証するのではなく、コンポーネントの状態変化が完了するのを待ってからassertionメソッドで検証しないといけないという気づきを得た。状態変化後のコンポーネントの状態になっていることが確認できてからassertionしている？っぽい

```typescript
    const renderCount1AfterMount = renderCount1
    const renderCount2AfterMount = renderCount2

    fireEvent.click(getByText('button1'))
    await waitFor(() => {
      getByText('count1: 1')
      getByText('count2: 0')
    })
    expect(renderCount1).toBe(renderCount1AfterMount + 1)
    expect(renderCount2).toBe(renderCount2AfterMount + 0)

    fireEvent.click(getByText('button2'))
    await waitFor(() => {
      getByText('count1: 1')
      getByText('count2: 1')
    })
    expect(renderCount1).toBe(renderCount1AfterMount + 1)
    expect(renderCount2).toBe(renderCount2AfterMount + 1)

```
