PGDMP     .                    z            website    14.2    14.2 4    )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    98326    website    DATABASE     c   CREATE DATABASE website WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE website;
                postgres    false            �            1259    98379    comunas    TABLE     �   CREATE TABLE public.comunas (
    id_comuna integer NOT NULL,
    id_region integer NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.comunas;
       public         heap    postgres    false            �            1259    98378    comunas_id_comuna_seq    SEQUENCE     �   CREATE SEQUENCE public.comunas_id_comuna_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.comunas_id_comuna_seq;
       public          postgres    false    212            -           0    0    comunas_id_comuna_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.comunas_id_comuna_seq OWNED BY public.comunas.id_comuna;
          public          postgres    false    211            �            1259    98432 	   productos    TABLE     �  CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    id_tipo_producto integer NOT NULL,
    precio integer NOT NULL,
    cantidad integer NOT NULL,
    foto character varying(50),
    esta_activo boolean NOT NULL,
    marca character varying(100),
    nombre character varying(100),
    CONSTRAINT productos_cantidad_check CHECK ((cantidad >= 0)),
    CONSTRAINT productos_precio_check CHECK ((precio >= 0))
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    98431    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          postgres    false    218            .           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          postgres    false    217            �            1259    98372    regiones    TABLE     l   CREATE TABLE public.regiones (
    id_region integer NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.regiones;
       public         heap    postgres    false            �            1259    98371    regiones_id_region_seq    SEQUENCE     �   CREATE SEQUENCE public.regiones_id_region_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.regiones_id_region_seq;
       public          postgres    false    210            /           0    0    regiones_id_region_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.regiones_id_region_seq OWNED BY public.regiones.id_region;
          public          postgres    false    209            �            1259    98466    solicitudes    TABLE     �   CREATE TABLE public.solicitudes (
    id_solicitud integer NOT NULL,
    pedido_global character varying(50) NOT NULL,
    id_usuario integer NOT NULL,
    id_producto integer NOT NULL,
    estado boolean NOT NULL
);
    DROP TABLE public.solicitudes;
       public         heap    postgres    false            �            1259    98465    solicitudes_id_solicitud_seq    SEQUENCE     �   CREATE SEQUENCE public.solicitudes_id_solicitud_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.solicitudes_id_solicitud_seq;
       public          postgres    false    220            0           0    0    solicitudes_id_solicitud_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.solicitudes_id_solicitud_seq OWNED BY public.solicitudes.id_solicitud;
          public          postgres    false    219            �            1259    98425    tipo_producto    TABLE     x   CREATE TABLE public.tipo_producto (
    id_tipo_producto integer NOT NULL,
    nombre character varying(50) NOT NULL
);
 !   DROP TABLE public.tipo_producto;
       public         heap    postgres    false            �            1259    98424 "   tipo_producto_id_tipo_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_producto_id_tipo_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tipo_producto_id_tipo_producto_seq;
       public          postgres    false    216            1           0    0 "   tipo_producto_id_tipo_producto_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tipo_producto_id_tipo_producto_seq OWNED BY public.tipo_producto.id_tipo_producto;
          public          postgres    false    215            �            1259    98402    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    contrasenia character varying(12) NOT NULL,
    telefono character varying(50) NOT NULL,
    direccion character varying(100) NOT NULL,
    id_comuna integer NOT NULL,
    esta_activo boolean NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    98401    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public          postgres    false    214            2           0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
          public          postgres    false    213            v           2604    98382    comunas id_comuna    DEFAULT     v   ALTER TABLE ONLY public.comunas ALTER COLUMN id_comuna SET DEFAULT nextval('public.comunas_id_comuna_seq'::regclass);
 @   ALTER TABLE public.comunas ALTER COLUMN id_comuna DROP DEFAULT;
       public          postgres    false    211    212    212            y           2604    98435    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    217    218    218            u           2604    98375    regiones id_region    DEFAULT     x   ALTER TABLE ONLY public.regiones ALTER COLUMN id_region SET DEFAULT nextval('public.regiones_id_region_seq'::regclass);
 A   ALTER TABLE public.regiones ALTER COLUMN id_region DROP DEFAULT;
       public          postgres    false    210    209    210            |           2604    98469    solicitudes id_solicitud    DEFAULT     �   ALTER TABLE ONLY public.solicitudes ALTER COLUMN id_solicitud SET DEFAULT nextval('public.solicitudes_id_solicitud_seq'::regclass);
 G   ALTER TABLE public.solicitudes ALTER COLUMN id_solicitud DROP DEFAULT;
       public          postgres    false    220    219    220            x           2604    98428    tipo_producto id_tipo_producto    DEFAULT     �   ALTER TABLE ONLY public.tipo_producto ALTER COLUMN id_tipo_producto SET DEFAULT nextval('public.tipo_producto_id_tipo_producto_seq'::regclass);
 M   ALTER TABLE public.tipo_producto ALTER COLUMN id_tipo_producto DROP DEFAULT;
       public          postgres    false    215    216    216            w           2604    98405    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    213    214    214                      0    98379    comunas 
   TABLE DATA           ?   COPY public.comunas (id_comuna, id_region, nombre) FROM stdin;
    public          postgres    false    212   �>       $          0    98432 	   productos 
   TABLE DATA           v   COPY public.productos (id_producto, id_tipo_producto, precio, cantidad, foto, esta_activo, marca, nombre) FROM stdin;
    public          postgres    false    218   tJ                 0    98372    regiones 
   TABLE DATA           5   COPY public.regiones (id_region, nombre) FROM stdin;
    public          postgres    false    210   S       &          0    98466    solicitudes 
   TABLE DATA           c   COPY public.solicitudes (id_solicitud, pedido_global, id_usuario, id_producto, estado) FROM stdin;
    public          postgres    false    220   �T       "          0    98425    tipo_producto 
   TABLE DATA           A   COPY public.tipo_producto (id_tipo_producto, nombre) FROM stdin;
    public          postgres    false    216   +U                  0    98402    usuarios 
   TABLE DATA           �   COPY public.usuarios (id_usuario, nombre, apellido, email, contrasenia, telefono, direccion, id_comuna, esta_activo) FROM stdin;
    public          postgres    false    214   �U       3           0    0    comunas_id_comuna_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.comunas_id_comuna_seq', 393, true);
          public          postgres    false    211            4           0    0    productos_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.productos_id_producto_seq', 271, true);
          public          postgres    false    217            5           0    0    regiones_id_region_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.regiones_id_region_seq', 48, true);
          public          postgres    false    209            6           0    0    solicitudes_id_solicitud_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.solicitudes_id_solicitud_seq', 14, true);
          public          postgres    false    219            7           0    0 "   tipo_producto_id_tipo_producto_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.tipo_producto_id_tipo_producto_seq', 14, true);
          public          postgres    false    215            8           0    0    usuarios_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 6, true);
          public          postgres    false    213            �           2606    98384    comunas comunas_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.comunas
    ADD CONSTRAINT comunas_pkey PRIMARY KEY (id_comuna);
 >   ALTER TABLE ONLY public.comunas DROP CONSTRAINT comunas_pkey;
       public            postgres    false    212            �           2606    98439    productos productos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    218            ~           2606    98377    regiones regiones_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.regiones
    ADD CONSTRAINT regiones_pkey PRIMARY KEY (id_region);
 @   ALTER TABLE ONLY public.regiones DROP CONSTRAINT regiones_pkey;
       public            postgres    false    210            �           2606    98471    solicitudes solicitudes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id_solicitud);
 F   ALTER TABLE ONLY public.solicitudes DROP CONSTRAINT solicitudes_pkey;
       public            postgres    false    220            �           2606    98430     tipo_producto tipo_producto_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.tipo_producto
    ADD CONSTRAINT tipo_producto_pkey PRIMARY KEY (id_tipo_producto);
 J   ALTER TABLE ONLY public.tipo_producto DROP CONSTRAINT tipo_producto_pkey;
       public            postgres    false    216            �           2606    98409    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            postgres    false    214            �           2606    98407    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    214            �           2606    98385    comunas comunas_id_region_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comunas
    ADD CONSTRAINT comunas_id_region_fkey FOREIGN KEY (id_region) REFERENCES public.regiones(id_region);
 H   ALTER TABLE ONLY public.comunas DROP CONSTRAINT comunas_id_region_fkey;
       public          postgres    false    210    3198    212            �           2606    98440 )   productos productos_id_tipo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_tipo_producto_fkey FOREIGN KEY (id_tipo_producto) REFERENCES public.tipo_producto(id_tipo_producto);
 S   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_id_tipo_producto_fkey;
       public          postgres    false    3206    216    218            �           2606    98477 (   solicitudes solicitudes_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 R   ALTER TABLE ONLY public.solicitudes DROP CONSTRAINT solicitudes_id_producto_fkey;
       public          postgres    false    218    220    3208            �           2606    98472 '   solicitudes solicitudes_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);
 Q   ALTER TABLE ONLY public.solicitudes DROP CONSTRAINT solicitudes_id_usuario_fkey;
       public          postgres    false    214    220    3204            �           2606    98410     usuarios usuarios_id_comuna_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_comuna_fkey FOREIGN KEY (id_comuna) REFERENCES public.comunas(id_comuna);
 J   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_id_comuna_fkey;
       public          postgres    false    214    212    3200               �  x�UXKr9]�N���wIђ�Jb�E��l�"L�V��*Eث9Ǭ��seN2�%��/�
x�L��T^_��E����?��`c߹SV���]V(�|�:m����S}���~��#��E�ٻ�t���"�i��g�p�/�`y�n��$�C��U@�F��w�S4W�j������f��{�ч K�޻��m�xC��l�`CV�^ڀ�de�ߏ!�Ȗ?��l����m�l1�V^+�y��GlXq?�_��&���*룷��oY�ٰ�[�j��,�BY�R|coqbx.�4��vi�p���g������*Wn]�-m<�.�
o��уEU�[�WW����޻H�U�����E��m�e�<�����\+����vx��^|;2<����.du�E'��.�F����,�K����!����g��D就qc��KV��=Sa��C�6kHh=v~�`�5��t��,�`�}�諒�9�}�'K{�� 69qߵ�ߺ�) ~�af�.v�/��}Κ����G��z��5?�<����LI�7��5Lw�@����fj>���;�zj����w|�\�|�����*���4���`!Y���B���������Q 9���ǖ/��������7� ).�R�*�0�J��;�qD�@T��q?��C�û|�Oy�:\Z��iv6�~C\
GDc��R��n��3���~��v��C���������.���!ynp�@���/�l���~�˹Do���_t1m`g�^�TN�8���׿��p����{�{��Y#��q�Rߛ�U}��d����.!-�A0P\F�9�����SS ���%�B�peO�&2����p��Cn���q�Q%TNJ���2�9	��x��9�6���/'%�eI�gڞ�rr{r���߿��7�Ɍ�]w��*�.�	J^w&nt,c*'��F'^-�B>�9{A���o�HX��R�Ua�y+�ı ��A9�ҫ��Y,za]�����E%�_BTԲ~8H�UE#B}��TIr�`������)@����h(��hXMN��z���m��8p���p�r�>)HDO��K���ƭ�ā��E��&ն%^�sHC#^Y��)��dz�,ꮪ�miG0OV����"mƴA�xz�B �DH��~Er+8��q�����@AQ��Ky]��S�G���kg�����8�u|���J{�L+ׅl1#�Zx�as��g�B���Z\�b#[�ѓ<���'_���r���}���CS�r��A^N�k������T
�l� ��8
񧧸�#�*i����
����D�4R}�� L�w�β�ѐ�~q�O@z� �]��D�� �툂��y�8�}z.|�^n�>�3*:�rO���B�9�"�|�\�8�h��i�J��SĴҗOn!G��V�bz���_��*Q[wL�CC/�Ď\ �{
�'ˤ�P�nCQ kBf&_C1 W2��o^p�J �_�������HO�p������$�853Z�����׺��zL'�Bt�6p���(鯵\��8���t�aD�i#$q�l�\mmT:�iv�!z��g���Θ?^�v�ҫ����ʦ&�R��D���~����~D���!��\;xǜ�F8>�R�r.������ ��/�=�'�U��?<z}��ż̓�V�@��_��F�P�>���6�@U�,ȵ�P�~?&/q� %�-�x1Fz�	C��H���Nh}�80�| �,���A���)O�|/��P)����^����'�P���F����
�!
Aa��ץ�]�!�.7��h+��B�����`��oq1f����o���3:�iፚֲ6겜 B�1]
��c�P��x�$HEg�#�d��������$<obC]��SX�*���{�?�J��`��U���J(���^���G��>�P�3�h]=7I�~�_�!4����R�=�PPI����p��e:�dCբfi�_B�s��n7^���g�R����p���gV�Mz�y�)�h���4�p����^H���o#�E��X��� ����N<25�h$�0�4��XU�'g���}����Y	$u��˖�P{HmZ$D];n�=���&��)�/�V�pd�B�M*��H� �Ö.3sa���|��y5��y=�CڪI=�ނ����>vD��c; ��Ɇ���(���4%%&�q\EXJw�iBW�d��g���C"_��+�O��(!�$�4~8�E8K��S1���29����OXE(R���9/.ni1�,>��&�|�O�;���z;��k:�O!)É�"~�h��_�ix���F^g�>�_$��M�����r�pR�8/��/�tD�Z�	p7v��il6��2}=� �A�-Z	�^�Q�Y��y�r��VH�b�Z%����u>ׂ#j�+gRC�*��;���Da��̡&�8,������
��Y�p4�\�����*a$�ey1ШJ�4e�T���?IؠP��i_fK�'��VU�?�\�j`�è�BB�8D��I�c��L��X.ݍ)t2p�Hlf�h�<��X����oS��
��Ǝ�ߩ���td�j�:�L � S̕#�Q��?2�K�;�>��c�3%��Vj�	O�����)�<9��R�d��=���%���-�7"M�^ZXSV	3��x�OK�|B��e����)���z+s)Lj2��S���b��|�:S��G�d�J8���flC`�>J�������_:��U�#2��J�iG�&C���3S_8^3֑������O�K�q���rh5��2�nM~҃�����a*/5�%�� d�J"'�jL���뉀DX�D���6�<��G��.�����HХ���G�4?��Y���Y��K;8=      $   �  x���Ks�H���W�Ҏ	�wj�è<6� l��ިm��)w���Ͻ)�D�]��^�~y�ɓ%����P��NGv~�t����c�y
_�-鍇d���m�lE�q�@��'����Q�y��F���Eپ�r? ��n^g'��������>hBZb!ถS�l<�= &O�����6z�l����P����cG��L������c┨鲆gq��Q",FQ�*(���p��Z�1H�l��89���y�z�0�Œ���>���%�k9��(PQn]�j19{b�<洕4�w� :p�IN)Hn��6��_���= K��P@Ŵ3G0��]>��0猞��!Ld1�F[��3��{�;��ؼ�1�0��r��S���EnC-�<��ԃm1�Ht��[{H�&�e �ig�<IA����1�����8f�ɖ�p��j�F�6/~g�G��>yM����lo|2�d�
u�pzn~4TvoȄJ�,�ˉ6t2��r
3f�o!���r�0\dHzc�B�J���z�cY2c�A����IP�h~Ƕ5�n�R9`0d�F�#�=Y�ǮU�ȋ!i��tpӅ���r\N��%7�F�nGzʀՋ��`�]��I�I�|�����7/	�zm0U�Y-1̇xy;�MHϰV��`���߈�f�d��1肩z#q�aDZ4U�_A1��f�]���(N^�sӃ}�1�
�-�Ƕ�b��*q{��L{�#@��Z�L�����2+zH�v\-F�f_�0���i��l$�(��d�A������&|�_�|>$�q`K����q ;�F�1L�Tڛp���gk9l��Ols���7/),ƭ��E�뤞\~����Dg�HQ��,Q|M���;8Vv{�����?��͂M�
'VQ�A�h�,ש֙<!�~=�o�r��܊6[��v�S����?y�P�ZU�6�K��!7Fg���ӏZp&cS��F��u������SU�ٸ�9��.c�gN��9mSQF���`�6�c����NՐ*�ss©\�������4���`�hϏ5� �����H~-�91����W q"\]�������K
+���b�}aq;LZƑ�z��- �M���mD<�'#B����S��?ޡP@�8������Av��kS6�D;.
���:ԑ#pA[
HƗi���A�Ji��:�i���=Li�#�G#�ɖZpV��s$��V��Ҧ��pk-e1'��ĘϦ�}!��'�0���т�-I�5c�Kf1Ս%qsvĮ]�% ��y�]��VʫļR�t�&���yj��`���]��w�F�܆j ��Ѓ*?�qN$&��`��d����i[50�L����l|��d��hj��-�E-�i*t׍�.(��v�H��}�i�R7쿅&�p���.�崳���|�,O�Z	X6�
�G�"�ʨ�y�1-1w�v^��i-��N��I}՘O����͕�s��^�.�w�Dۣ�����ܥל3�Z� �L�\�3js�29�O�j�+W�����(����[4��C �^�r��k$�
���p��O�����)\��� �2GU�!��G�����m.�+�>.����������r8����+� �kQ7��F-�R,-��yAub�*nX�Ҿ��K:�;�ǧ��H(��T��l�~��L�4����veA����N���f(r$iI-��۹Y���Ѝ���ku�8����[<�����R�^)tC�����*u8;/[�A,"G�M���w��(�w1�\�0�\�a�8'���Y/�� ����ӄ�F~�||<N~�(i�$�=�5��R��R�9�\3Nw��Bpo���Z���+xt��� ��;n�=��Ʃ��d���_� |�}
6���y��촟�҈��l�@�2
���_,�`� � �Wr���^��}�� .���0גؗIy] ��V|�k �n�+��c�4�O}Oy�������A�j��}D?q9'W�00G�^�$ƞҼi���G�^7���`�'��$��Ԗ#�qT=ǆ�p�;+T�:�jW��O�4�E�_���������#�*5� ͓1X��J�6뒷���X�g�4Wr7�����1����$��B�ۻ`U?1�xܬx{���5��V�b��������l�         �  x���;N�0���'@�I:� )� &�/�	�\;8�P&���"����IpA@��1�{$��?���D)ݫ�s�GV�W�
��P�m�o�B�[#�YӍ��j?�;�
X ��󸔋ܠ�]�U���MmP�ۘ�ƚ�(ـ���5�FBiP�ZV8���̍�gB
���`�_�˲��F����J ��p��|[$�ɱ4��D:Yd��e�m �N ���̯Ԉ����_����V������~���U~�"wk�&��zXT��NjS��R�E�����-�[�f9y�Jh\���ae2�c�Qș� 4�}Ҕ�AM���t��q �&Al��c�a�EalF��f�pl�v`3��K��Y�fI��}�l�6���$��i �� 6���|��q�'Gb��p�S��'$U�      &   `   x�Mλ�0E�����DbZj��&n�t���y_,

"^��	�@gBl`ׄ�`Z�l	Q�*00�Q�LMV5�[��	K�+m�\bM��9�"&
      "   �   x�=�K
�@�ݧ�'��b�U0$��M;ӑ�����yģ����._�B��qG>(�P4���䕱9��
�r�� ֤G�d�������ٔ�q�V<y�')���2�@&�&�h���<o��	�,i/-GFkaq�6�'Zϊ6��H�=i�Pr�r`%'�{k��� *�"�Ȭ�o�p� ���Gp          �   x�]�Aj�0���)�Ȯl�r�.ŋ�=@��R�J�k|���'�X����,�)p���X�of�X�~)g3��9����>���<��Uu�S�)�S��*ǧ�zml������v${���E�J�/�(�jG�]��z�Wrݠ4�P����:1�P�6-ݗ��Z�N�ƥˆ�nG�)+]���BM�v�Oձ5�ض�mG���T�6c��(�����@     