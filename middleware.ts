// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
//
// export function middleware(request: NextRequest) {
// 	const pathname = request.nextUrl.pathname;
// 	const accessToken = request.cookies.get('accessToken')?.value;
//
// 	const protectedRoutes = ['/control'];
// 	const isProtectedRoute = protectedRoutes.some((route) =>
// 		pathname.startsWith(route)
// 	);
//
// 	// Đã login → không cho vào /login
// 	if (pathname === '/login' && accessToken) {
// 		try {
// 			jwt.verify(accessToken, process.env.JWT_SECRET!);
// 			return NextResponse.redirect(
// 				new URL('/control', request.url)
// 			);
// 		} catch {
// 			// token sai → xoá cookie
// 			const res = NextResponse.next();
// 			res.cookies.delete('accessToken');
// 			return res;
// 		}
// 	}
//
// 	// Chưa login → chặn route protected
// 	if (isProtectedRoute) {
// 		if (!accessToken) {
// 			return NextResponse.redirect(
// 				new URL(`/login?redirect=${pathname}`, request.url)
// 			);
// 		}
//
// 		try {
// 			jwt.verify(accessToken, process.env.JWT_SECRET!);
// 		} catch {
// 			const res = NextResponse.redirect(
// 				new URL('/login', request.url)
// 			);
// 			res.cookies.delete('accessToken');
// 			return res;
// 		}
// 	}
//
// 	return NextResponse.next();
// }
//
// export const config = {
// 	matcher: ['/login', '/control/:path*'],
// };


import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const accessToken = request.cookies.get('accessToken');

	const protectedRoutes = ['/control'];
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	// Đã login → không cho vào /login
	if (pathname === '/login' && accessToken) {
		return NextResponse.redirect(
			new URL('/control', request.url)
		);
	}

	// Chưa login → chặn route protected
	if (isProtectedRoute && !accessToken) {
		return NextResponse.redirect(
			new URL(`/login?redirect=${pathname}`, request.url)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/login', '/control/:path*'],
};
