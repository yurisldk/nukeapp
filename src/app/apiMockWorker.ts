import { setupWorker } from 'msw/browser'
import { cartHandlers } from '@/entities/cart/api/__mocks__/cartHandlers'
import { categoriesHandlers } from '@/entities/category/api/__mocks__/categoryHandlers'
import { featureToggleHandlers } from '@/entities/featureToggle/api/__mocks__/featureToggleHandlers'
import { productsHandlers } from '@/entities/product/api/__mocks__/productHandlers'
import { sessionHandlers } from '@/entities/session/api/__mocks__/sessionHandlers'
import { userHandlers } from '@/entities/user/api/__mocks__/userHandlers'
import { wishlistHandlers } from '@/entities/wishlist/api/__mocks__/wishlistHandlers'
// eslint-disable-next-line no-restricted-imports
import { __serverStartDatabaseMigration } from '@/shared/lib/server'
import { widgetProductDetailsHandlers } from '@/widgets/ProductDetails/api/__mocks__/widgetProductDetailsHandlers'
import { widgetProductPopularListHandlers } from '@/widgets/ProductPopularList/api/__mocks__/widgetProductPopularListHandlers'

const apiMockWorker = setupWorker(
  // @widgets layer handlers
  ...widgetProductPopularListHandlers,
  ...widgetProductDetailsHandlers,

  // @entities layer handlers
  ...categoriesHandlers,
  ...wishlistHandlers,
  ...productsHandlers,
  ...sessionHandlers,
  ...featureToggleHandlers,
  ...cartHandlers,
  ...userHandlers,
)

__serverStartDatabaseMigration()

export async function startApiMockWorker() {
  await apiMockWorker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url)

      if (/\.png|jpg|svg|tsx?|css|jsx?|woff2$/.test(url.pathname)) {
        return
      }

      print.warning()
    },
  })
}
