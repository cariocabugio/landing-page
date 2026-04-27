// src/app/admin/dashboard/page.tsx
'use client';

import React, { useEffect, useState, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOutUser } from '@/lib/authService';
import {
  getPageDataForUser,
  addLinkToPage,
  deleteLinkFromPage,
  updateLinksOnPage,
  updatePageTheme,
  updatePageBackground,
  updateProfileImage,
  updatePageProfileInfo,
  PageData,
  LinkData,
  UserData,
  findUserByEmail,
  updateUserPlan,
  getAllUsers, // <-- NOVA FUNÇÃO
} from '@/lib/pageService';
import {
  FaLock,
  FaSearch,
  FaCamera,
  FaUserCog,
  FaArrowLeft,
  FaImage,
  FaSave,
  FaQrcode,
  FaChartLine,
  FaUsers,
  FaCrown,
  FaChartPie,
  FaIdBadge,
  FaLink,
  FaUserEdit,
} from 'react-icons/fa';
import Image from 'next/image';

// --- Imports para Drag and Drop ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableLinkItem } from '@/components/SortableLinkItem';

// --- Libs Novas ---
import { QRCodeCanvas } from 'qrcode.react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// --- CONFIGURAÇÃO DO CLOUDINARY ---
const CLOUDINARY_CLOUD_NAME = 'dhzzvc3vl';
const CLOUDINARY_UPLOAD_PRESET = 'links-page-pro';
// ----------------------------------

// Definição dos temas disponíveis
const themes = [
  { name: 'light', label: 'Claro', colorClass: 'bg-gray-100', isPro: false },
  { name: 'dark', label: 'Escuro', colorClass: 'bg-gray-900', isPro: false },

  // Novos Temas PRO
  {
    name: 'developer',
    label: 'Desenvolvedor',
    colorClass: 'bg-[#0d1117] border border-[#238636]',
    isPro: true,
  },
  {
    name: 'realtor',
    label: 'Corretor (Luxo)',
    colorClass: 'bg-neutral-900 border border-yellow-600',
    isPro: true,
  },
  {
    name: 'restaurant',
    label: 'Restaurante',
    colorClass: 'bg-red-900',
    isPro: true,
  },
  {
    name: 'mechanic',
    label: 'Oficina',
    colorClass: 'bg-slate-800 border-l-4 border-cyan-500',
    isPro: true,
  },
  {
    name: 'influencer',
    label: 'Influencer',
    colorClass: 'bg-gradient-to-tr from-yellow-400 to-purple-600',
    isPro: true,
  },

  // Temas Pro Antigos
  {
    name: 'ocean',
    label: 'Oceano',
    colorClass: 'bg-gradient-to-r from-ocean-start to-ocean-end',
    isPro: true,
  },
  {
    name: 'sunset',
    label: 'Pôr do Sol',
    colorClass: 'bg-gradient-to-r from-sunset-start to-sunset-end',
    isPro: true,
  },
  {
    name: 'forest',
    label: 'Floresta',
    colorClass: 'bg-forest-bg',
    isPro: true,
  },
  {
    name: 'bubblegum',
    label: 'Chiclete',
    colorClass: 'bg-bubblegum-bg',
    isPro: true,
  },
];

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  // Sistema de Tabs (Navegação Interna)
  const [activeTab, setActiveTab] = useState<'personal' | 'admin'>('personal');

  // Estado Principal
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [pageSlug, setPageSlug] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // --- MODO SUPER ADMIN (Gerenciar outro usuário) ---
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const [targetUserEmail, setTargetUserEmail] = useState<string | null>(null);
  // --------------------------------------------------

  // --- ESTADOS PARA EDIÇÃO DE PERFIL (TEXTO) ---
  const [editingProfileTitle, setEditingProfileTitle] = useState('');
  const [editingProfileBio, setEditingProfileBio] = useState('');

  // Estados de Links e UI
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkIcon, setNewLinkIcon] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingUrl, setEditingUrl] = useState('');
  const [editingIcon, setEditingIcon] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copiar');

  // Estado para a imagem de fundo personalizada
  const [customBgUrl, setCustomBgUrl] = useState('');

  // Estados para upload
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  // Estado QR Code
  const [showQRCode, setShowQRCode] = useState(false);

  // Verifica se é Admin
  const isAdmin = userData?.role === 'admin';

  // Verifica se o plano é Pro
  const isProPlan = targetUserId ? true : userData?.plan === 'pro';

  // Estados Admin (Busca e Lista)
  const [searchEmail, setSearchEmail] = useState('');
  const [foundUser, setFoundUser] = useState<
    (UserData & { uid: string }) | null
  >(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  // --- NOVOS ESTADOS PARA LISTAGEM GERAL DE USUÁRIOS ---
  const [allUsers, setAllUsers] = useState<(UserData & { uid: string })[]>([]);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [errorAllUsers, setErrorAllUsers] = useState<string | null>(null);

  const whatsappNumber = '5579996337995';

  // --- CONFIGURAÇÃO DOS SENSORES DO DND-KIT ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --- FUNÇÃO PARA LIDAR COM O FIM DO ARRASTE ---
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && pageData?.links) {
      setPageData((prev) => {
        if (!prev) return null;

        const oldIndex = prev.links.findIndex(
          (link, idx) => link.url + idx === active.id
        );
        const newIndex = prev.links.findIndex(
          (link, idx) => link.url + idx === over.id
        );

        const newLinks = arrayMove(prev.links, oldIndex, newIndex);

        const reorderedLinks = newLinks.map((link, index) => ({
          ...link,
          order: index + 1,
        }));

        if (pageSlug) {
          updateLinksOnPage(pageSlug, reorderedLinks).catch((err) => {
            console.error('Erro ao salvar ordem:', err);
            alert('Erro ao salvar a nova ordem dos links.');
          });
        }

        return {
          ...prev,
          links: reorderedLinks,
        };
      });
    }
  };

  // --- FUNÇÕES ---

  const fetchPageData = useCallback(async () => {
    const idToFetch = targetUserId || user?.uid;

    if (idToFetch) {
      setIsLoadingData(true);
      const result = await getPageDataForUser(idToFetch);
      if (result) {
        const data = result.data as PageData;

        if (data.links) {
          data.links.sort((a, b) => (a.order || 0) - (b.order || 0));
        }

        setPageData(data);
        setPageSlug(result.slug);

        setEditingProfileTitle(data.title || '');
        setEditingProfileBio(data.bio || '');

        if (data.backgroundImage) {
          setCustomBgUrl(data.backgroundImage);
        } else {
          setCustomBgUrl('');
        }
      } else {
        console.error(
          'Não foi possível carregar os dados da página do usuário.'
        );
        setPageData(null);
        setPageSlug(null);
      }
      setIsLoadingData(false);
    } else {
      setIsLoadingData(false);
    }
  }, [user, targetUserId]);

  // Carrega todos os usuários (apenas quando o admin estiver visualizando a aba Gestão SaaS)
  const fetchAllUsers = useCallback(async () => {
    if (!isAdmin || targetUserId) return;
    setIsLoadingAllUsers(true);
    setErrorAllUsers(null);
    try {
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      setErrorAllUsers('Falha ao carregar a lista de usuários.');
    } finally {
      setIsLoadingAllUsers(false);
    }
  }, [isAdmin, targetUserId]);

  useEffect(() => {
    if (!loading && user) {
      fetchPageData();
    }
  }, [user, loading, fetchPageData]);

  // Efeito para buscar a lista geral de usuários quando a aba admin estiver ativa
  useEffect(() => {
    if (activeTab === 'admin' && isAdmin && !targetUserId) {
      fetchAllUsers();
    }
  }, [activeTab, isAdmin, targetUserId, fetchAllUsers]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOutUser();
  };

  const handleManageUser = (uid: string, email: string | undefined) => {
    setTargetUserId(uid);
    setTargetUserEmail(email || 'Cliente');
    setAdminMessage(null);
    setFoundUser(null);
    setSearchEmail('');
    setActiveTab('personal'); // Força a aba pessoal para ver a página do cliente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdminMode = () => {
    setTargetUserId(null);
    setTargetUserEmail(null);
    setActiveTab('admin'); // Volta para o painel admin ao sair
  };

  const generateWhatsAppLink = (
    planType: 'Mensal' | 'Anual',
    price: string
  ) => {
    const message = `Olá! Gostaria de fazer o upgrade para o plano Pro ${planType} (R$${price}).`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleAddLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!pageSlug || !newLinkTitle || !newLinkUrl) {
      alert('Por favor, preencha pelo menos o Título e a URL.');
      return;
    }
    const currentLinks = pageData?.links || [];
    const newOrder =
      currentLinks.length > 0
        ? Math.max(...currentLinks.map((l) => l.order)) + 1
        : 1;

    const newLink: LinkData = {
      title: newLinkTitle,
      url: newLinkUrl,
      ...(newLinkIcon.trim() && { icon: newLinkIcon.trim().toLowerCase() }),
      type: 'website',
      order: newOrder,
      clicks: 0,
    };
    try {
      await addLinkToPage(pageSlug, newLink);
      setNewLinkTitle('');
      setNewLinkUrl('');
      setNewLinkIcon('');
      await fetchPageData();
    } catch (error) {
      console.error('Erro ao adicionar link:', error);
      alert('Falha ao adicionar o link. Tente novamente.');
    }
  };

  const handleDeleteLink = async (linkToDelete: LinkData) => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o link "${linkToDelete.title}"?`
      )
    ) {
      return;
    }
    if (!pageSlug) {
      alert('Erro crítico: ID da página não encontrado.');
      return;
    }
    try {
      await deleteLinkFromPage(pageSlug, linkToDelete);
      await fetchPageData();
    } catch (error) {
      console.error('Erro ao excluir link:', error);
      alert('Falha ao excluir o link.');
    }
  };

  const handleEditClick = (link: LinkData, index: number) => {
    setEditingIndex(index);
    setEditingTitle(link.title);
    setEditingUrl(link.url);
    setEditingIcon(link.icon || '');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingTitle('');
    setEditingUrl('');
    setEditingIcon('');
  };

  const handleUpdateLink = async (indexToUpdate: number) => {
    if (
      !pageSlug ||
      !pageData ||
      !pageData.links ||
      editingIndex !== indexToUpdate
    )
      return;

    const updatedLinks = [...pageData.links];

    updatedLinks[indexToUpdate] = {
      ...updatedLinks[indexToUpdate],
      title: editingTitle,
      url: editingUrl,
      ...(editingIcon.trim()
        ? { icon: editingIcon.trim().toLowerCase() }
        : { icon: undefined }),
    };

    if (!editingIcon.trim()) {
      delete updatedLinks[indexToUpdate].icon;
    }

    try {
      await updateLinksOnPage(pageSlug, updatedLinks);
      handleCancelEdit();
      await fetchPageData();
    } catch (error) {
      console.error('Erro ao atualizar link:', error);
      alert('Falha ao atualizar o link. Tente novamente.');
    }
  };

  const handleCopyUrl = () => {
    if (!pageSlug) return;
    const shareableUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${pageSlug}`;
    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        setCopyButtonText('Copiado!');
        setTimeout(() => setCopyButtonText('Copiar'), 2000);
      })
      .catch((err) => {
        console.error('Erro ao copiar URL:', err);
        alert('Não foi possível copiar a URL.');
      });
  };

  const handleThemeChange = async (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;

    if (theme.isPro && !isProPlan) {
      alert('Este é um tema Pro! Faça upgrade para usá-lo.');
      return;
    }

    if (!pageSlug) {
      alert('Erro: Slug da página não encontrado para salvar o tema.');
      return;
    }

    try {
      await updatePageTheme(pageSlug, themeName);
      setPageData((prevData) =>
        prevData ? { ...prevData, theme: themeName } : null
      );
    } catch (error) {
      console.error('Erro ao mudar tema:', error);
      alert('Falha ao atualizar o tema. Tente novamente.');
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro no upload Cloudinary:', errorData);
        throw new Error('Falha no upload da imagem.');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  };

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !pageSlug) return;

    setIsUploadingProfile(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      await updateProfileImage(pageSlug, imageUrl);
      setPageData((prev) =>
        prev ? { ...prev, profileImageUrl: imageUrl } : null
      );
      alert('Foto de perfil atualizada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar foto de perfil.');
    } finally {
      setIsUploadingProfile(false);
    }
  };

  const handleBackgroundImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !pageSlug) return;

    if (!isProPlan) {
      alert('Imagem de fundo personalizada é um recurso Pro!');
      return;
    }

    setIsUploadingBg(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      await updatePageBackground(pageSlug, imageUrl);
      setPageData((prev) =>
        prev ? { ...prev, backgroundImage: imageUrl } : null
      );
      alert('Imagem de fundo atualizada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar imagem de fundo.');
    } finally {
      setIsUploadingBg(false);
    }
  };

  const handleSaveProfileInfo = async () => {
    if (!pageSlug) return;
    try {
      await updatePageProfileInfo(
        pageSlug,
        editingProfileTitle,
        editingProfileBio
      );
      setPageData((prev) =>
        prev
          ? { ...prev, title: editingProfileTitle, bio: editingProfileBio }
          : null
      );
      alert('Informações salvas!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar informações.');
    }
  };

  const handleSearchUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchEmail) return;
    setIsSearching(true);
    setAdminMessage(null);
    setFoundUser(null);
    try {
      const userResult = await findUserByEmail(searchEmail);
      if (userResult) {
        setFoundUser(userResult);
      } else {
        setAdminMessage(`Usuário com email "${searchEmail}" não encontrado.`);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setAdminMessage(
        'Ocorreu um erro ao buscar o usuário. Verifique o console.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleChangePlan = async (newPlan: 'pro' | 'free', userObj?: (UserData & { uid: string })) => {
    const targetUser = userObj || foundUser;
    if (!targetUser) return;
    setIsUpdatingPlan(true);
    setAdminMessage(null);
    try {
      await updateUserPlan(targetUser.uid, newPlan);
      // Atualiza o usuário no estado local (busca ou lista)
      if (userObj) {
        setAllUsers(prev =>
          prev.map(u => u.uid === targetUser.uid ? { ...u, plan: newPlan } : u)
        );
      } else {
        setFoundUser(prev => prev ? { ...prev, plan: newPlan } : null);
      }
      setAdminMessage(
        `Plano do usuário ${targetUser.email} atualizado para '${newPlan}' com sucesso!`
      );
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      setAdminMessage(
        `Falha ao atualizar o plano: ${(error as Error).message}`
      );
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  if (loading || (!isAdmin && isLoadingData)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">
            Carregando ambiente...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Preparar dados para o gráfico
  const chartData =
    pageData?.links?.map((link) => ({
      name: link.title,
      cliques: link.clicks || 0,
    })) || [];

  // Cálculo dos KPIs
  const totalUsers = allUsers.length;
  const proUsers = allUsers.filter((u) => u.plan === 'pro').length;
  const conversionRate = totalUsers > 0 ? ((proUsers / totalUsers) * 100).toFixed(1) + '%' : '--';

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Banner de Super Admin Ativo */}
      {targetUserId && (
        <div className="bg-red-600 text-white px-4 py-3 shadow-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <FaUserCog className="text-xl" />
              <span>SUPER ADMIN: Gerenciando perfil de {targetUserEmail}</span>
            </div>
            <button
              onClick={handleExitAdminMode}
              className="bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-sm"
            >
              <FaArrowLeft /> Encerrar Sessão Cliente
            </button>
          </div>
        </div>
      )}

      {/* Navbar Principal */}
      <nav
        className={`bg-white border-b border-gray-200 ${targetUserId ? '' : 'sticky top-0 z-40'}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                L
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                Meus Links <span className="text-blue-600">Pro</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && !targetUserId && (
                <span className="hidden sm:flex items-center gap-1 text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded border border-red-200 uppercase tracking-wider">
                  <FaCrown /> Acesso Root
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors"
              >
                Sair do sistema
              </button>
            </div>
          </div>
        </div>

        {/* --- TABS DE NAVEGAÇÃO PARA ADMINS --- */}
        {isAdmin && !targetUserId && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-6 border-t border-gray-100 pt-2">
              <button
                onClick={() => setActiveTab('personal')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'personal'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Meu Perfil
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gestão SaaS <FaLock className="text-xs opacity-70" />
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ========================================= */}
        {/* RENDERIZAÇÃO DA ABA: GESTÃO SAAS (ADMIN)  */}
        {/* ========================================= */}
        {activeTab === 'admin' && isAdmin && !targetUserId ? (
          <div className="animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Painel de Controle SaaS
              </h2>
              <p className="text-gray-600">
                Visão geral e gerenciamento da base de clientes da plataforma.
              </p>
            </div>

            {/* KPIs / Stat Cards - agora dinâmicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                  <FaUsers />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total de Usuários
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingAllUsers ? '...' : totalUsers}
                  </p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl">
                  <FaCrown />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Assinantes PRO
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingAllUsers ? '...' : proUsers}
                  </p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xl">
                  <FaChartPie />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Conversão (Free → Pro)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingAllUsers ? '...' : conversionRate}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabela com todos os usuários */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="bg-gray-50 border-b border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FaUsers className="text-gray-400" /> Todos os Usuários
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Lista completa dos usuários cadastrados na plataforma.
                </p>
              </div>

              {isLoadingAllUsers ? (
                <div className="p-6 text-center">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Carregando usuários...</p>
                </div>
              ) : errorAllUsers ? (
                <div className="p-6 bg-red-50 text-red-700 text-sm font-medium">
                  {errorAllUsers}
                </div>
              ) : allUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Nenhum usuário encontrado.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          E-mail
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plano
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUsers.map((usr) => (
                        <tr key={usr.uid} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {usr.displayName || 'Sem nome'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {usr.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                usr.plan === 'pro'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {usr.plan === 'pro' ? 'PRO' : 'Free'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleManageUser(usr.uid, usr.email)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                              title="Logar como este usuário"
                            >
                              <FaUserEdit className="inline" /> Gerenciar
                            </button>
                            <button
                              onClick={() =>
                                handleChangePlan(
                                  usr.plan === 'free' ? 'pro' : 'free',
                                  usr
                                )
                              }
                              disabled={isUpdatingPlan}
                              className={`${
                                usr.plan === 'free'
                                  ? 'text-green-600 hover:text-green-900'
                                  : 'text-yellow-600 hover:text-yellow-900'
                              }`}
                              title="Alterar plano"
                            >
                              {usr.plan === 'free' ? 'Upgrade' : 'Rebaixar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Módulo de Busca individual (mantido) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FaSearch className="text-gray-400" /> Buscar Cliente Específico
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Localize um usuário pelo email para ações rápidas.
                </p>
              </div>

              <div className="p-6">
                <form
                  onSubmit={handleSearchUser}
                  className="flex flex-col sm:flex-row gap-3 mb-6"
                >
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdBadge className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      placeholder="email@cliente.com"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-gray-900 hover:bg-black text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-70 whitespace-nowrap"
                  >
                    {isSearching ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Buscando...
                      </span>
                    ) : (
                      'Localizar'
                    )}
                  </button>
                </form>

                {adminMessage && (
                  <div
                    className={`p-4 mb-6 rounded-lg text-sm font-medium ${
                      adminMessage.includes('sucesso')
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : adminMessage.includes('não encontrado')
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {adminMessage}
                  </div>
                )}

                {/* Cartão de Cliente (CRM Flow) */}
                {foundUser && (
                  <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {foundUser.displayName || 'Usuário sem nome'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {foundUser.email}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 font-mono">
                          ID: {foundUser.uid}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Status do Plano
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            foundUser.plan === 'pro'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {foundUser.plan === 'pro' ? 'PRO ATIVO' : 'GRATUITO'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 bg-gray-50 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          handleChangePlan(
                            foundUser.plan === 'free' ? 'pro' : 'free'
                          )
                        }
                        disabled={isUpdatingPlan}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          foundUser.plan === 'free'
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm shadow-green-200'
                            : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border border-yellow-300'
                        }`}
                      >
                        {foundUser.plan === 'free'
                          ? 'Fazer Upgrade para PRO'
                          : 'Rebaixar para Gratuito'}
                      </button>

                      <button
                        onClick={() =>
                          handleManageUser(foundUser.uid, foundUser.email)
                        }
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
                      >
                        <FaUserCog /> Logar como Cliente
                      </button>

                      <button
                        onClick={() => {
                          setFoundUser(null);
                          setSearchEmail('');
                          setAdminMessage(null);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================= */
          /* RENDERIZAÇÃO DA ABA: MEU PERFIL (PESSOAL) */
          /* ========================================= */
          <div className="animate-in fade-in duration-300">
            {/* O cabeçalho de boas-vindas do cliente */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {targetUserId
                      ? `Editando Perfil de: ${pageData?.title || targetUserEmail}`
                      : `Bem-vindo(a), ${pageData?.title || userData?.displayName || user.displayName || 'Usuário'}!`}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isProPlan
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {isProPlan ? 'Plano Pro' : 'Plano Gratuito'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative group">
                    {pageData?.profileImageUrl ? (
                      <Image
                        src={pageData.profileImageUrl}
                        alt="Foto de Perfil"
                        width={84}
                        height={84}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                        <FaCamera size={24} />
                      </div>
                    )}
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg ring-2 ring-white"
                    >
                      <FaCamera size={14} />
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                        disabled={isUploadingProfile}
                      />
                    </label>
                    {isUploadingProfile && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* --- SEÇÃO DE ANALYTICS (GRÁFICOS) --- */}
            {pageData?.links && pageData.links.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FaChartLine />
                  </div>
                  Desempenho dos Links
                  {!isProPlan && (
                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200 ml-2">
                      Prévia Demo
                    </span>
                  )}
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        dx={-10}
                      />
                      <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Bar dataKey="cliques" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {pageSlug && (
              <>
                {/* Link Publico e QR Code */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-md mb-8 text-white">
                  <h3 className="text-lg font-bold mb-3">Sua Página está Online! 🚀</h3>
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                    <span className="truncate font-mono text-sm w-full block pl-2 font-medium opacity-90">
                      {`${typeof window !== 'undefined' ? window.location.origin : ''}/${pageSlug}`}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleCopyUrl}
                        className="w-full sm:w-auto bg-white text-blue-700 font-bold py-2 px-5 rounded-md text-sm transition-all hover:bg-gray-50 shadow-sm"
                      >
                        {copyButtonText}
                      </button>
                      <button
                        onClick={() => setShowQRCode(!showQRCode)}
                        className="w-full sm:w-auto bg-black/30 text-white hover:bg-black/40 font-bold py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2 transition-all border border-white/10"
                      >
                        <FaQrcode /> QR Code
                      </button>
                    </div>
                  </div>

                  {/* MODAL QR CODE */}
                  {showQRCode && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                      onClick={() => setShowQRCode(false)}
                    >
                      <div
                        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Seu QR Code Exclusivo</h3>
                        <div className="bg-gray-50 p-4 inline-block rounded-xl border border-gray-200 mb-6 shadow-inner">
                          <QRCodeCanvas
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/${pageSlug}`}
                            size={200}
                            level={'H'}
                            fgColor="#111827"
                          />
                        </div>
                        <button
                          onClick={() => setShowQRCode(false)}
                          className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Informações do Perfil */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-5">
                    Detalhes do Perfil
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nome de Exibição
                      </label>
                      <input
                        type="text"
                        value={editingProfileTitle}
                        onChange={(e) => setEditingProfileTitle(e.target.value)}
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Biografia
                      </label>
                      <textarea
                        value={editingProfileBio}
                        onChange={(e) => setEditingProfileBio(e.target.value)}
                        rows={3}
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSaveProfileInfo}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-black font-semibold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                    >
                      <FaSave /> Salvar Alterações
                    </button>
                  </div>
                </div>

                {/* Aparencia */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8" id="appearance-section">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Aparência & Design
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Personalize o visual da sua página pública.
                  </p>

                  <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded">
                        <FaImage size={14} />
                      </div>
                      Fundo Personalizado
                      {!isProPlan && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                          <FaLock size={10} /> PRO
                        </span>
                      )}
                    </h4>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageUpload}
                      disabled={!isProPlan || isUploadingBg}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-white file:text-indigo-600 file:border file:border-indigo-200 hover:file:bg-indigo-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {isUploadingBg && (
                      <p className="text-xs font-semibold text-indigo-600 mt-2 flex items-center gap-1">
                        <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        Processando imagem...
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {themes.map((theme) => {
                      const isActive = (pageData?.theme || 'light') === theme.name;
                      const isDisabledByPlan = theme.isPro && !isProPlan;

                      return (
                        <button
                          key={theme.name}
                          onClick={() => handleThemeChange(theme.name)}
                          disabled={isDisabledByPlan}
                          className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 focus:outline-none flex flex-col items-center group ${
                            isActive
                              ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                              : isDisabledByPlan
                                ? 'border-gray-100 opacity-60 cursor-not-allowed bg-gray-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`h-12 w-full rounded-lg mb-3 border border-gray-200/50 shadow-inner group-hover:shadow-md transition-shadow ${theme.colorClass}`}
                          ></div>
                          <span className="text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5 w-full">
                            {theme.label}
                            {isDisabledByPlan && (
                              <FaLock className="text-gray-400" size={10} />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Upsell para usuários Free */}
                  {!isProPlan && !targetUserId && (
                    <div className="mt-8 pt-8 border-t border-gray-200 bg-gradient-to-b from-transparent to-blue-50/30 rounded-b-xl -mx-6 -mb-6 p-6">
                      <div className="text-center max-w-lg mx-auto">
                        <h4 className="text-xl font-extrabold text-gray-900 mb-2">
                          Eleve o nível da sua página
                        </h4>
                        <p className="text-gray-600 text-sm mb-6">
                          Desbloqueie fundos personalizados, temas premium, remoção da marca d'água e muito mais com o Meus Links Pro.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <a
                            href={generateWhatsAppLink('Mensal', '9,99')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm text-sm"
                          >
                            Mensal R$9,99
                          </a>
                          <a
                            href={generateWhatsAppLink('Anual', '90,00')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-blue-200 text-sm flex items-center justify-center gap-2"
                          >
                            Anual R$90,00
                            <span className="bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                              -25%
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Adicionar / Gerenciar Links */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-5">
                    Adicionar Novo Link
                  </h3>
                  <form onSubmit={handleAddLink} className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="linkTitle" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Título
                        </label>
                        <input
                          required
                          type="text"
                          id="linkTitle"
                          value={newLinkTitle}
                          onChange={(e) => setNewLinkTitle(e.target.value)}
                          className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Ex: Meu Portfólio"
                        />
                      </div>
                      <div>
                        <label htmlFor="linkUrl" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          URL (Link)
                        </label>
                        <input
                          required
                          type="url"
                          id="linkUrl"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="linkIcon" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Ícone <span className="text-gray-400 font-normal normal-case tracking-normal">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        id="linkIcon"
                        value={newLinkIcon}
                        onChange={(e) => setNewLinkIcon(e.target.value)}
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Ex: github, instagram, linkedin"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      Adicionar ao Perfil
                    </button>
                  </form>
                </div>

                {/* Lista de Links Ordenável */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Meus Links Organizados
                    </h3>
                    {pageData?.links && pageData.links.length > 1 && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        Arraste para reordenar
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-transparent">
                    {pageData?.links && pageData.links.length > 0 ? (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={pageData.links.map((l, idx) => l.url + idx)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-3">
                            {pageData.links.map((link, index) => {
                              if (editingIndex === index) {
                                return (
                                  <div
                                    key={link.url + index}
                                    className="p-5 bg-white border-2 border-blue-400 rounded-xl shadow-md mb-3 transition-all"
                                  >
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                                            Título
                                          </label>
                                          <input
                                            type="text"
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                                            URL
                                          </label>
                                          <input
                                            type="url"
                                            value={editingUrl}
                                            onChange={(e) => setEditingUrl(e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                                          Ícone
                                        </label>
                                        <input
                                          type="text"
                                          value={editingIcon}
                                          onChange={(e) => setEditingIcon(e.target.value)}
                                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="Ex: whatsapp"
                                        />
                                      </div>
                                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                        <button
                                          onClick={handleCancelEdit}
                                          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                                        >
                                          Cancelar
                                        </button>
                                        <button
                                          onClick={() => handleUpdateLink(index)}
                                          className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
                                        >
                                          Salvar Alterações
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <SortableLinkItem
                                  key={link.url + index}
                                  link={link}
                                  index={index}
                                  onEdit={() => handleEditClick(link, index)}
                                  onDelete={() => handleDeleteLink(link)}
                                  editingIndex={editingIndex}
                                />
                              );
                            })}
                          </div>
                        </SortableContext>
                      </DndContext>
                    ) : (
                      <div className="text-center py-12 bg-white border border-dashed border-gray-300 rounded-xl">
                        <FaLink className="mx-auto text-gray-300 text-4xl mb-3" />
                        <p className="text-gray-500 font-medium">
                          Nenhum link adicionado ainda.
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Use o formulário acima para criar seu primeiro link.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}