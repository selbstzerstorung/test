// Добавить импорты
const Profile = lazy(() => import('../pages/Profile'));
const Transactions = lazy(() => import('../pages/Transactions'));

// Добавить маршруты
<Route path="/profile" element={
    <ProtectedRoute>
        <Layout>
            <Profile />
        </Layout>
    </ProtectedRoute>
} />

<Route path="/transactions" element={
    <ProtectedRoute>
        <Layout>
            <Transactions />
        </Layout>
    </ProtectedRoute>
} />
